const UserRepository = require("../repository/UserRepository");
const bcrypt = require(`bcryptjs`);
const jwtUtils = require("../utils/jwtUtils")
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

  static async login( {email, password}) {
    
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new AppError(401, 'Invalid credentials', 'Email or password is incorrect');
    }

    if (user.provider !== 'EMAIL') {
      throw new AppError(
        400,
        'Invalid login method',
        `This account uses ${user.provider} login`
      );
    }

    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError(401, 'Invalid credentials', 'Email or password is incorrect');
    }

    const { accessToken, refreshToken } = jwtUtils.generateTokenPair(user.id, user.email);

    // // Update refresh token di database
    // await prisma.user.update({
    //   where: { id: user.id },
    //   data: { refreshToken }
    // });

    const { password: _, ...userWithoutPassword } = user;

    // Response
    return {
      user: userWithoutPassword,
      tokens: { accessToken, refreshToken },
    };
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }


  static async logout(userId){}
};


module.exports= AuthService;
