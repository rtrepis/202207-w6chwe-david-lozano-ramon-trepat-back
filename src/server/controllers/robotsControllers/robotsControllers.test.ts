import { Request, Response, NextFunction } from "express";
import Robot from "../../../database/models/Robot";
import createCustomError from "../../../utils/errors";
import { deleteRobot, getRobots } from "./robotsControllers";

describe("Given a controller", () => {
  describe("When getRobots it's called", () => {
    describe("And it receives a response", () => {
      test("Then it should call the response method status with 200", async () => {
        const req: Partial<Request> = {};
        const res: Partial<Response> = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
        const status = 200;

        Robot.find = jest.fn();

        await getRobots(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(status);
      });
    });
    describe("And Robot.find return a list with Mazinger and Optimus", () => {
      test("Then it should call the response method json with Mazinger and Optimus", async () => {
        const req: Partial<Request> = {};
        const res: Partial<Response> = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
        const robotList = [
          {
            name: "Mazinger",
          },
          {
            name: "Optimus",
          },
        ];

        Robot.find = jest.fn().mockResolvedValue(robotList);

        await getRobots(req as Request, res as Response);

        expect(res.json).toHaveBeenCalledWith({ robots: robotList });
      });
    });
  });

  describe("When deleteRobot it's called", () => {
    describe("And it receives a response with correct id", () => {
      const req: Partial<Request> = { params: { idRobot: "1" } };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn() as Partial<NextFunction>;

      test("Then it should call the response method status with 202", async () => {
        const status = 202;

        Robot.findById = jest.fn();
        Robot.deleteOne = jest.fn();

        await deleteRobot(
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(res.status).toHaveBeenCalledWith(status);
      });

      test("Then it should call the response method json with message", async () => {
        const messageJson = { message: "Robot has been deleted" };

        Robot.findById = jest.fn();
        Robot.deleteOne = jest.fn();

        await deleteRobot(
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(res.json).toHaveBeenCalledWith(messageJson);
      });
    });

    describe("And it receives a response with wrong id", () => {
      test("Then it should call next function with an error ", async () => {
        const req: Partial<Request> = { params: { idRobot: "23" } };
        const res: Partial<Response> = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
        const next = jest.fn() as Partial<NextFunction>;
        const { idRobot } = req.params;

        const customError = createCustomError(
          404,
          "Robot id doesn't exist",
          `User introduced ${idRobot} and doesn't exists`
        );

        Robot.findById = jest.fn().mockRejectedValue(new Error());
        Robot.deleteOne = jest.fn();

        await deleteRobot(
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalledWith(customError);
      });
    });
  });
});
