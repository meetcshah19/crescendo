import util from "util";
import multer from "multer";

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let FilePath = process.cwd() + "/uploads/" + req.sessionID + "/";
    cb(null, __basedir + "/uploads/" + req.sessionID + "/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);

export default uploadFileMiddleware;
//module.exports = uploadFileMiddleware;
