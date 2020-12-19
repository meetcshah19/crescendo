import express from "express";
import uploadFileMiddleware from "../middlewares/upload.js";
import { upload, getListFiles } from "../controllers/fileController.js";
import { chooseTemplate } from "../controllers/templateController.js";

const fileRouter = express.Router();

fileRouter.post("/upload", uploadFileMiddleware, upload);
fileRouter.get("/files", getListFiles);
fileRouter.post("/chooseTemplate", chooseTemplate);

export default fileRouter;
