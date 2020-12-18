import express from "express";
import cors from "cors";
import fileRouter from "./routes/fileRouter.js";
import path from "path";

const app = express();
const port = 6900;
global.__basedir = process.cwd();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(fileRouter);

app.listen(port, () => console.log("Listening on port 6900!"));
