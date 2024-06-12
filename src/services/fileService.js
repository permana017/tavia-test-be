import fs from "fs";
import csv from "csv-parser";
import xlsx from "xlsx";
import { Employee } from "../models/employee.js";

export const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
};

export const parseXLS = (filePath) => {
  return new Promise((resolve, reject) => {
    try {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const results = xlsx.utils.sheet_to_json(sheet);
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
};

export const exportToXLS = async () => {
  const employees = await Employee.findAll();
  const employeeData = employees.map(
    (employee) => ({ ...employee.dataValues })
    // console.log("ssadasd", employee.dataValues)
  );
  console.log("employessasdasd", employees);
  const worksheet = xlsx.utils.json_to_sheet(employeeData);
  const workbook = xlsx.utils.book_new();
  console.log(employees);
  xlsx.utils.book_append_sheet(workbook, worksheet, "Employees");
  const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
  return buffer;
};
