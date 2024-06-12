import express from "express";
import authRouter from "./authRoute.js";
import employeeRouter from "./employeeRoute.js";
import uploadRouter from "./uploadRoute.js";
import documentRouter from "./documentRoute.js";

const router = express();

router.get("/", (req, res) => {
  return res.send({ status: 404, message: "not founds" });
});

router.use("/auth", authRouter);
router.use("/", employeeRouter);
router.use("/upload", uploadRouter);
router.use("/doc", documentRouter);

export default router;
