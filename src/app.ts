import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import router from "./app/routes";
import globalError from "./middlewares/globalError";

app.use(express.json());
app.use(express.text());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use(globalError);

export default app;
