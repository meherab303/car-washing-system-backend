


import jwt from "jsonwebtoken";

export const createToken = (
  jwtPayload: {userEmail:string,role:'admin'|'user'},
  secret: string,
  expiresIn: string
) =>{
    if (!secret || typeof secret !== "string") {
        throw new Error("JWT secret must be a valid string");
      }
     
      return jwt.sign(jwtPayload, secret,{expiresIn});
  };