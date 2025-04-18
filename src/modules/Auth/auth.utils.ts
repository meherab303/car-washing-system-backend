import jwt from "jsonwebtoken";

export const createToken = (
  jwtPayload: { userEmail: string; role: string },
  secret: string,
  expiresIn: string,
): string => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
