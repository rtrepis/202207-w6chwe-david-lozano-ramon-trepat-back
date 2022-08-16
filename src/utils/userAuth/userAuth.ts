import "../../loadEnvironment";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  id: string;
  userName: string;
}

export const createToken = (payload: JwtPayload) =>
  jwt.sign(payload, process.env.SECRET);

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.SECRET);
