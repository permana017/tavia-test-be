import {
  createEmployeeService,
  findAllEmployeeService,
} from "../services/employeeService.js";
import { exportToXLS, parseCSV, parseXLS } from "../services/fileService.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const findAllEmployeeController = async (req, res) => {
  try {
    const employees = await findAllEmployeeService();
    return res.status(200).json({ data: employees });
  } catch (error) {
    return res.status(500).json({ message, error });
  }
};

export const createEmployeeController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobilePhone,
      phone,
      placeOfBirth,
      birthdate,
      gender,
      isMerried,
      identityType,
      identityNumber,
      isPermanent,
      identityEpireDate,
      postcalCode,
      cityIdaddress,
      residentialAddress,
    } = req.body;
    const result = await createEmployeeService({
      firstName,
      lastName,
      email,
      mobilePhone,
      phone,
      placeOfBirth,
      birthdate,
      gender,
      isMerried,
      identityType,
      identityNumber,
      isPermanent,
      identityEpireDate,
      postcalCode,
      cityIdaddress,
      residentialAddress,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const importFileController = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    let employees;
    if (file.mimetype === "text/csv") {
      employees = await parseCSV(file.path);
    } else {
      employees = await parseXLS(file.path);
    }

    let result = [];
    for (const employee of employees) {
      const createdEmployee = await createEmployeeService(employee);
      result.push(createdEmployee);
    }

    return res.status(201).json({
      message: "Employees created successfully",
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing file", error: error.message });
  }
};

export const exportXLS = async (req, res) => {
  try {
    const buffer = await exportToXLS();
    const filePath = path.join(
      __dirname,
      "../../public/upload/export-file/employees.xlsx"
    );
    console.log("asdsad", filePath);
    fs.writeFileSync(filePath, buffer);
    res.download(filePath);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error exporting data to XLS", error: error.message });
  }
};
