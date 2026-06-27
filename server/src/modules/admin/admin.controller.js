import AdminService from "./admin.service.js";

class AdminController {
  getUsers = async (
    req,
    res,
    next
  ) => {
    try {
      const users =
        await AdminService.getUsers();

      res.json(users);
    } catch (error) {
      next(error);
    }
  };
}

export default new AdminController();