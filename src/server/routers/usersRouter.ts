import express from "express";
import loginUser from "../controllers/usersControllers/usersControllers";

const usersRouter = express.Router();

usersRouter.post("/login", loginUser);

export default usersRouter;
