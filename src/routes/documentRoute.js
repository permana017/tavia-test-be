import express from "express";
import importFile from "../middlewares/importFile.js";
import {
  exportXLS,
  importFileController,
} from "../controllers/employeeConroller.js";

const documentRouter = express();

documentRouter.post("/import", importFile.single("file"), importFileController);
documentRouter.get("/export", exportXLS);

export default documentRouter;
