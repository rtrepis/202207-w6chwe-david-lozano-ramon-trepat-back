import "./loadEnvironment";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import robotsRouter from "./server/routers/robotsRouter";
import connectDB from "./database/connectDB";
import startServer from "./server/startServer";
import app from "./loadApp";
import { endpointError, generalError } from "./server/middlewares/errors";
import usersRouter from "./server/routers/usersRouter";

const port = process.env.PORT ?? 4000;
const mongoURL = process.env.MONGO_URI;

// eslint-disable-next-line consistent-return

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/robots", robotsRouter);
app.use("/users", usersRouter);

app.use(endpointError);
app.use(generalError);

(async () => {
  connectDB(mongoURL);
  startServer(+port);
})();
