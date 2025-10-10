const AuthService = require("../services/AuthService");


class AuthController {

  static async register(req, res, next) {
    try{
      const {email, password} = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email, and password are required",
        });
      }

      const user = await AuthService.register({ email, password });
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
    
  }
}


module.exports= AuthController;