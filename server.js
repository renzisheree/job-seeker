import "express-async-errors";
import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
dotenv.config();

const app = express();

import jobRoutes from "./routes/job.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

//public
import path, { dirname } from "path";
import { fileURLToPath } from "url";

//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./public")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello ");
});
app.post("/", (req, res, next) => {
  console.log(req);
  res.json({
    message: "data received",
    data: req.body,
  });
});

app.use("/api/v1/jobs", authenticateUser, jobRoutes);
app.use("/api/v1/user", authenticateUser, userRoutes);
app.use("/api/v1/auth", authRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    msg: "Not found1",
  });
});
app.use(errorHandlerMiddleware);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "Something went wrong" });
});

const port = process.env.PORT || 5100;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log("Server running on port " + port);
  });
} catch (err) {
  console.log(err);
  process.exit(1);
}
