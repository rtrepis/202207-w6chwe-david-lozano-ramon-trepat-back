import { Response, Request } from "express";
import { createToken, JwtPayload } from "../../../utils/userAuth/userAuth";

const loginUser = (req: Request, res: Response) => {
  const user = req.body;
  const payload: JwtPayload = {
    id: "2t32473830592721238950237",
    userName: user.username,
  };
  const userToken = createToken(payload);
  res.status(200).json(userToken);
};

export default loginUser;
