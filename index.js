import express from "express";
import cors from "cors";
import fileRouter from "./routes/fileRouter.js";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
const port = 6900;
global.__basedir = process.cwd();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cookieParser());
app.use(
  session({
    secret: "1@#@#%FHGKL@#hdsfg9*6", // just a long random string
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(fileRouter);

app.listen(port, () => console.log("Listening on port 6900!"));
