import express from "express";
import uploadFile from "../middlewares/upload.js";
import {
  upload,
  getListFiles,
  download,
} from "../controllers/fileController.js";

const fileRouter = express.Router();

fileRouter.post("/upload", uploadFile, upload);
fileRouter.get("/files", getListFiles);
fileRouter.get("/files/:name", download);

export default fileRouter;
