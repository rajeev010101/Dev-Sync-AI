import User from "../../models/User.js";

class UserService {
  async getProfile(id) {
    return User.findById(id);
  }

  async updateProfile(
    id,
    payload
  ) {
    return User.findByIdAndUpdate(
      id,
      payload,
      {
        new: true
      }
    );
  }
}

export default new UserService();