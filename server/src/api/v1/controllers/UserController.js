const UserService = require("../../../../../../point-of-sale/apps/api/src/services/UserService");

class UserController {
  // methods here
  static async getAllUsers(req, res, next) {

    try{
      const result = await UserService.getAllUsers();
      res.json({
        success: true,
        message: "List of users",
        data: result
      });

    }catch(err){next(err)}
  }

  static async getUserById(req, res) {

    res.json({
      success: true,
      message: `User with ID`,
    });
  }

  static async createUser(req, res) {
    res.json({
      success: true,
      message: "User created",
    });
  }

  static async updateUser(req, res) {
    res.json({
      success: true,
      message: `User with ID updated`,
    });
  }

  static async deleteUser(req, res) {
    res.json({
      success: true,
      message: `User with ID deleted`,
    });
  }

  static async profile(req, res) {
    res.json({
      success: true,
      message: "User profile",
    });
  }


}

module.exports = UserController;
