import express from "express";
import { uploadImageController } from "../controllers/uploadImageController.js";
import { formUploadCloud, formUploadImage } from "../middlewares/multer.js";

const uploadRouter = express();

uploadRouter.post(
  "/images",
  formUploadImage.array("images"),
  uploadImageController
);
uploadRouter.post(
  "/images/cloud",
  formUploadCloud.array("images"),
  uploadImageController
);

export default uploadRouter;
