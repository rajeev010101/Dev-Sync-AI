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