import { Employee } from "../models/employee.js";

export const findAllEmployeeService = async () => {
  try {
    const employees = await Employee.findAll();
    return employees;
  } catch (error) {
    throw new Error(error);
  }
};

export const createEmployeeService = async (data) => {
  try {
    const employee = await Employee.create(data);
    return { employee };
  } catch (error) {
    throw new Error(error);
  }
};
