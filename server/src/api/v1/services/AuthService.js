const UserRepository = require("../repository/UserRepository");
const bcrypt = require(`bcryptjs`);
const AppError = require("../../shared/utils/ApiError")

class AuthService {
  static async register( {email, password}) {
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError(
        "Email is already registered. please login instead.",
        400
      );
    }

     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      email,
      password: hashedPassword,
    };

    const newUser = await UserRepository.create(userData);

    return newUser;
  }
}

module.exports= AuthService;
