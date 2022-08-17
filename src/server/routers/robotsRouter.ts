import express from "express";
import {
  getRobots,
  deleteRobot,
} from "../controllers/robotsControllers/robotsControllers";
import userAuthentification from "../middlewares/userAuthentification/userAuthentification";

const robotsRouter = express.Router();

robotsRouter.get("/", userAuthentification, getRobots);
robotsRouter.delete("/delete/:idRobot", deleteRobot);

export default robotsRouter;
