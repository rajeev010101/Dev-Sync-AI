import UserService from "./user.service.js";

class UserController {
  getProfile = async (
    req,
    res,
    next
  ) => {
    try {
      const profile =
        await UserService.getProfile(
          req.user.userId
        );

      res.json(profile);
    } catch (error) {
      next(error);
    }
  };

  updateProfile =
    async (
      req,
      res,
      next
    ) => {
      try {
        const profile =
          await UserService.updateProfile(
            req.user.userId,
            req.body
          );

        res.json(profile);
      } catch (error) {
        next(error);
      }
    };
}

export default new UserController();