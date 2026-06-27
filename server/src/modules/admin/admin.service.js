import User from "../../models/User.js";
import AIUsage from "../../models/AIUsage.js";

class AdminService {
  async getUsers() {
    return User.find();
  }

  async getAIAnalytics() {
  return AIUsage.aggregate([
    {
      $group: {
        _id: "$feature",
        totalTokens: {
          $sum: "$totalTokens"
        },
        requests: {
          $sum: 1
        }
      }
    }
  ]);
}
}



export default new AdminService();