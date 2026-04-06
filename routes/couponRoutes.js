import express from "express";
import { applyCoupon } from "../controllers/couponController";

const couponRoutes = express.Router();

couponRoutes.post("/apply", applyCoupon);

export default couponRoutes;
