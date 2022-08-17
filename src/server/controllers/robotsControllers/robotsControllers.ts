import Debug from "debug";
import chalk from "chalk";
import { NextFunction, Request, Response } from "express";
import Robot from "../../../database/models/Robot";
import createCustomError from "../../../utils/errors";

const debug = Debug("robots:server:controllers:robotsController");

export const getRobots = async (req: Request, res: Response) => {
  const robotList = await Robot.find();

  res.status(200).json({ robots: robotList });
  debug(chalk.green("The list of robots has been sent successfully"));
};

export const deleteRobot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idRobot } = req.params;

  try {
    await Robot.findById({ _id: idRobot });

    await Robot.deleteOne({ _id: idRobot });

    res.status(202).json({ message: "Robot has been deleted" });
  } catch (error) {
    const customError = createCustomError(
      404,
      "Robot id doesn't exist",
      `User introduced ${idRobot} and doesn't exists`
    );
    next(customError);
  }
};
