import util from "util";
import multer from "multer";
import fs from "fs";

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let filePath = __basedir + "/uploads/" + req.sessionID + "/";

    fs.mkdir(filePath, (err) => {
      cb(null, filePath);
    });
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadFile = multer({ storage: storage }).single("file");
let uploadFileMiddleware = util.promisify(uploadFile);

export default uploadFileMiddleware;
