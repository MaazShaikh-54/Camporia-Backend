import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDb connection error: ", err));

app.use("/auth", authRoutes);


const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server runnning on port ${PORT}`));
