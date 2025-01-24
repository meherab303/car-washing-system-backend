/* eslint-disable @typescript-eslint/no-unsafe-return */


import jwt from "jsonwebtoken";

export const createToken = (
  jwtPayload: {userEmail:string,role:'admin'|'user'},
  secret: string,
  expiresIn: string
):string =>{
    if (!secret || typeof secret !== "string") {
        throw new Error("JWT secret must be a valid string");
      }
      if (!expiresIn || typeof expiresIn !== "string") {
        throw new Error("JWT expiration time must be a valid string");
      }
    return jwt.sign(jwtPayload,secret,{expiresIn})
  };