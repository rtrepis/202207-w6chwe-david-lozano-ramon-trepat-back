import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface UserLoginInfo {
  username: string;
  password: string;
}

export interface CustomRequest extends Request {
  payload: JwtPayload;
}
