import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import campsiteRoutes from "./routes/campsiteRoutes.js";
import journeyRoutes from "./routes/journeyRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/campsites", campsiteRoutes);
app.use("/journeys", journeyRoutes);
app.use("/reviews", reviewRoutes);
app.use("/coupon", couponRoutes)

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => console.log(`Server runnning on port ${PORT}`));
