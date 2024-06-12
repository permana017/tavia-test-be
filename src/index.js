import express from "express";
import router from "./routes/index.js";
import sequelize from "./utils/connection.js";
import bodyParser from "body-parser";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", router);

// app.post("/upload-images", formUploadImage.any("images"), async (req, res) => {
//   try {
//     const files = req.files;
//     return res.status(200).json(files);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

app.get("*", (req, res) => {
  return res.send({ status: 404, message: "not founds" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const startConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Success connect to the Database!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startConnect();
