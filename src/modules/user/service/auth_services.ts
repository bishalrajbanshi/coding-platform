import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "@utils/bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "@utils/jwt";
import prisma from "prisma/prisma";
class AuthServices {
  static async authenticateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return null;
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async generateAuthToken(user: any) {
    const payload = { id: user._id, email: user.email, role: user.role };
    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);
    return {
      accessToken,
      refreshToken,
    };
  }
  static refreshAccessToken(refreshToken: string) {
    const decoded = verifyRefreshToken(refreshToken);
    const { id, email, role } = decoded as jwt.JwtPayload;
    const newAccessToken = generateAccessToken({ id, email, role });
    return newAccessToken;
  }
}

export default AuthServices;
