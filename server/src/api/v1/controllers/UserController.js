class UserController {
  // methods here
  static async getAllUsers(req, res) {
    res.json({
      success: true,
      message: "List of users",
    });
  }
}

module.exports = UserController;
