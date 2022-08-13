import "./loadEnvironment";
import morgan from "morgan";
import robotsRouter from "./server/routers/robotsRouter";
import connectDB from "./database/connectDB";
import startServer from "./server/startServer";
import app from "./loadApp";
import { endpointError } from "./server/middlewares/errors";

const port = process.env.PORT ?? 4000;
const mongoURL = process.env.MONGO_URI;

// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use(morgan("dev"));

app.use("/robots", robotsRouter);

app.use(endpointError);

(async () => {
  connectDB(mongoURL);
  startServer(+port);
})();
