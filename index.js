import express from "express";
import cors from "cors";
import fileRouter from "./routes/fileRouter.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import session from "express-session";
import Pusher from "pusher";
import http from "http";

const app = express();
const port = 6900;
global.__basedir = process.cwd();

var corsOptions = {
  origin: "http://23.101.172.131:3000",
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileRouter);
app.use("/uploads", express.static(path.join(__basedir, "uploads")));
app.use("/images", express.static(path.join(__basedir, "images")));

app.listen(port, () => console.log("Listening on port 6900!"));
