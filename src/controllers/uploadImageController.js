import { uploadImageService } from "../services/uploadImageService.js";

export const uploadImageController = async (req, res) => {
  const { files } = req;
  const { employeeId } = req.body;
  console.log(req);
  try {
    if (!employeeId)
      return res.status(400).json({ message: "employee id is required" });

    if (!files?.length)
      return res.status(400).json({ message: "Images is required" });

    const data = files.map(async (file, index) => {
      const image = await uploadImageService({
        imageName: file.filename,
        employeeId,
      });
      return { image };
    });

    return res.status(201).json({ message: "succes upload images", data });
  } catch (error) {
    return res.status(500).json(error);
  }
};
