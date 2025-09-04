import jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET || "defaultsecret";
export const JWT_REFRESH_SECRET: string =
  process.env.JWT_REFRESH_SECRET || "defaultrefreshsecret";

export const generateAccessToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
};
export const generateRefreshToken = (payload: object): string => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (
  accessToken: string
): string | jwt.JwtPayload => {
  return jwt.verify(accessToken, JWT_SECRET);
};

export const verifyRefreshToken = (
  refreshToken: string
): string | jwt.JwtPayload => {
  return jwt.verify(refreshToken, JWT_REFRESH_SECRET);
};
