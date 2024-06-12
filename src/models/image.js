import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/connection.js";
export class Image extends Model {}
Image.init(
  {
    imageName: DataTypes.STRING,
    employeeId: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Images",
  }
);
