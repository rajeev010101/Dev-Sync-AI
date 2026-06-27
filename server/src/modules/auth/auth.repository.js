import User from "../../models/User.js";

class AuthRepository {
  async findByEmail(email) {
    return User.findOne({ email }).select("+password");
  }

  async create(data) {
    return User.create(data);
  }

  async findById(id) {
    return User.findById(id);
  }
}

export default new AuthRepository();