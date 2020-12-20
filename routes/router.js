import express from "express";
import uploadFileMiddleware from "../middlewares/upload.js";
import {
    upload,
    getListFiles,
    getOutputFile,
    chooseTemplate,
} from "../controllers/controller.js";

const router = express.Router();

router.post("/upload", uploadFileMiddleware, upload);
router.get("/files", getListFiles);
router.get("/output", getOutputFile);
router.post("/chooseTemplate", chooseTemplate);

export default router;
