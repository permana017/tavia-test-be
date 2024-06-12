import express from "express";
import {
  createEmployeeController,
  findAllEmployeeController,
} from "../controllers/employeeConroller.js";

const employeeRouter = express();

employeeRouter.get("/employees", findAllEmployeeController);
employeeRouter.post("/employee", createEmployeeController);

export default employeeRouter;
