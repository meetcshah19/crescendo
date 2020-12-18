import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import mkdirp from "mkdirp";
import fs from "fs";
const app = express();
const port = 6900;
import cookieParser from "cookie-parser";
import session from "express-session";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const splitFile = async() => {
    await delay(10000);
};

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
app.get("/status", function(req, res) {
    console.log("in status");
    console.log(req.query["query"])
    if (req.query["query"] == "split") {
        res.status(200).send("split success");
    }
});
app.post("/upload", function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let File = req.files.audio;

    // Use the mv() method to place the file somewhere on your server

    let FilePath = process.cwd() + "/uploads/" + req.sessionID + "/";

    fs.mkdirSync(FilePath, { recursive: true });
    File.mv(FilePath + File.name, function(err) {
        if (err) return res.status(500).send(err);
        await splitFile();
        res.status(200).send({ "unique-id": req.sessionID });
    });
});

app.get("/status", function(req, res) {
    console.log("status called!");
    return STATUS;
});

// Routes
app.get("/", (req, res) => {
    res.sendFile("index.html");
});

const startServer = () => {
    app.listen(port, () => console.log("Listening on port 6900!"));
};

startServer();