import { NextFunction, Response } from "express";
import createCustomError from "../../../utils/errors";
import { verifyToken } from "../../../utils/userAuth/userAuth";
import { CustomRequest } from "../../types/loginTypes";

const userAuthentification = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const customError = createCustomError(
    400,
    "Bad Login",
    "User sends bad login"
  );
  const requestAuthentification = req.get("Authorization");

  if (
    !requestAuthentification ||
    !requestAuthentification.startsWith("Bearer ")
  ) {
    next(customError);
    return;
  }

  const token = requestAuthentification.slice(7);
  const userToken = verifyToken(token);

  if (typeof userToken === "string") {
    next(customError);
    return;
  }

  req.payload = userToken;
  next();
};

export default userAuthentification;
