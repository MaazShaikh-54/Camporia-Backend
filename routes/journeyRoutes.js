import express from "express";
import authMiddleware, { adminOnly } from "../middleware/auth.js";
import {
  createJourney,
  getJourneys,
  getJourneyById,
  updateJourney,
  previewPrice,
  cancelJourney,
} from "../controllers/journeyController.js";

const journeyRouter = express.Router();

journeyRouter.post("/create-journey", authMiddleware, createJourney);
journeyRouter.get("/get", getJourneys);
journeyRouter.get("/:id", getJourneyById);
journeyRouter.put("/:id", updateJourney);
journeyRouter.post("/preview-price", previewPrice);
journeyRouter.patch("/:id/cancel", cancelJourney);

export default journeyRouter;
