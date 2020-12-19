import express from "express";
import session from "express-session";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import router from "./routes/router.js";

global.__basedir = process.cwd();
const app = express();
const port = 6900;

var corsOptions = {
  origin: "http://23.101.172.131:3000",
  origin: "http://localhost:3000",
};

app.use(
  session({
    secret: "1@#@#%FHGKL@#hdsfg9*6", // just a long random string
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use(router);
app.use("/uploads", express.static(path.join(__basedir, "uploads")));
app.use("/images", express.static(path.join(__basedir, "images")));

app.listen(port, () => console.log("Listening on port 6900!"));
