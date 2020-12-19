import express from "express";
import uploadFileMiddleware from "../middlewares/upload.js";
import {
  upload,
  getListFiles,
  download,
} from "../controllers/fileController.js";

const fileRouter = express.Router();

fileRouter.post("/upload", uploadFileMiddleware, upload);
fileRouter.get("/files/client_id=:client_id", getListFiles);
fileRouter.get("/files/:name", download);

export default fileRouter;
