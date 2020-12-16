import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import mkdirp from "mkdirp";
import fs from "fs";
const app = express();
const port = 6900;
import cookieParser from "cookie-parser";
import session from "express-session";

app.use(fileUpload());
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  session({
    secret: "jgfiuakyeg76341874285%^%$^#@#^!$",
    resave: false,
    saveUninitialized: true,
  })
);

app.post("/upload", function (req, res) {
  console.log(req.files.audio);
  if (!req.files || Object.keys(req.files).length === 0) {
    console.log(req.files);
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let File = req.files.audio;

  // Use the mv() method to place the file somewhere on your server

  let FilePath = process.cwd() + "/uploads/" + req.sessionID + "/";
  console.log(FilePath);

  fs.mkdirSync(FilePath, { recursive: true });

  File.mv(FilePath + File.name, function (err) {
    if (err) return res.status(500).send(err);
    console.log("success");
    res.status(200).send("File uploaded");
  });
});

// Routes
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

const startServer = () => {
  app.listen(port, () => console.log("Listening on port 6900!"));
};

startServer();