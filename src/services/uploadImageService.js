import { Image } from "../models/image.js";

export const uploadImageService = async ({ imageName, employeeId }) => {
  console.log(imageName, employeeId);
  const image = await Image.create({
    imageName,
    employeeId,
  });
  return { image };
};
