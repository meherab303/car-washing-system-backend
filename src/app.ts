import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import router from "./app/routes";
import notFound from "./middlewares/notFound";
import globalError from "./middlewares/globalError";



app.use(express.json());
app.use(express.text());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(notFound)
app.use(globalError);


export default app;
