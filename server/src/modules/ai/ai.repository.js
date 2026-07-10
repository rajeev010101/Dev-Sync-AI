import AIChat from "../../models/AIChat.js";
import AIMessage from "../../models/AIMessage.js";

class AIRepository {
  async createChat(data) {
    return AIChat.create(data);
  }

  async createMessage(data) {
    return AIMessage.create(data);
  }

  async getChatMessages(chatId) {
    return AIMessage.find({
      chat: chatId
    }).sort({
      createdAt: 1
    });
  }

  async getUserChats(userId) {
    return AIChat.find({ user: userId }).sort({ updatedAt: -1 });
  }

  async updateChatTitle(chatId, userId, title) {
    return AIChat.findOneAndUpdate({ _id: chatId, user: userId }, { title }, { new: true });
  }

  async deleteChat(chatId, userId) {
    const chat = await AIChat.findOneAndDelete({ _id: chatId, user: userId });
    if (chat) await AIMessage.deleteMany({ chat: chatId });
    return chat;
  }

  async validateOwnership(
  chatId,
  userId
) {
  return AIChat.findOne({
    _id: chatId,
    user: userId
  });
}

}


export default new AIRepository();
