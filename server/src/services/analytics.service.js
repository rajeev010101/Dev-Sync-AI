import AIUsage from "../models/AIUsage.js";

class AnalyticsService {
  /**
   * Store a single AI usage event
   */
  async trackUsage(data) {
    const usage = await AIUsage.create({
      user: data.userId,
      chat: data.chatId,
      provider: data.provider,
      model: data.model,
      promptTokens: data.promptTokens || 0,
      completionTokens: data.completionTokens || 0,
      totalTokens: data.totalTokens || 0,
      cost: data.cost || 0,
      requestType: data.requestType || "chat",
      metadata: data.metadata || {},
    });

    return usage;
  }

  /**
   * Aggregate today's usage
   */
  async aggregateDaily(date = new Date()) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return AIUsage.aggregate([
      {
        $match: {
          createdAt: {
            $gte: start,
            $lte: end,
          },
        },
      },
      {
        $group: {
          _id: "$provider",
          requests: {
            $sum: 1,
          },
          totalTokens: {
            $sum: "$totalTokens",
          },
          totalCost: {
            $sum: "$cost",
          },
        },
      },
    ]);
  }

  /**
   * Aggregate monthly usage
   */
  async aggregateMonthly(year, month) {
    return AIUsage.aggregate([
      {
        $project: {
          provider: 1,
          totalTokens: 1,
          cost: 1,
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
      },
      {
        $match: {
          year,
          month,
        },
      },
      {
        $group: {
          _id: "$provider",
          requests: {
            $sum: 1,
          },
          totalTokens: {
            $sum: "$totalTokens",
          },
          totalCost: {
            $sum: "$cost",
          },
        },
      },
    ]);
  }

  /**
   * Calculate overall AI cost
   */
  async calculateCost(userId = null) {
    const match = {};

    if (userId) {
      match.user = userId;
    }

    const result = await AIUsage.aggregate([
      {
        $match: match,
      },
      {
        $group: {
          _id: null,
          totalCost: {
            $sum: "$cost",
          },
          totalTokens: {
            $sum: "$totalTokens",
          },
          totalRequests: {
            $sum: 1,
          },
        },
      },
    ]);

    return (
      result[0] || {
        totalCost: 0,
        totalTokens: 0,
        totalRequests: 0,
      }
    );
  }
}

export default new AnalyticsService();