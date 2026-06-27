import AIUsage
from "../../../models/AIUsage.js";

class TokenService {
  async save(
    payload
  ) {
    return AIUsage.create(
      payload
    );
  }
}

export default new TokenService();