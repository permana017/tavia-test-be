import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/connection.js";
export class Employee extends Model {}
Employee.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    mobilePhone: DataTypes.STRING,
    phone: DataTypes.STRING,
    placeOfBirth: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    gender: DataTypes.STRING,
    isMerried: DataTypes.BOOLEAN,
    identityType: DataTypes.STRING,
    identityNumber: DataTypes.STRING,
    isPermanent: DataTypes.BOOLEAN,
    identityEpireDate: DataTypes.DATE,
    postcalCode: DataTypes.STRING,
    cityIdaddress: DataTypes.STRING,
    residentialAddress: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Employees",
  }
);
