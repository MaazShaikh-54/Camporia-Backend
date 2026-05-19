import express from "express";
import authMiddleware, { adminOnly } from "../../middleware/auth.js";
import {
    getJourneys,
    getJourneyById,
    updateJourney,
    deleteJourney
} from "../../controllers/admin/adminJourneyController.js";

const adminJourneyRouter = express.Router();

adminJourneyRouter.get("/journeys", authMiddleware, adminOnly, getJourneys);
adminJourneyRouter.get("/journey/:id", authMiddleware, adminOnly, getJourneyById);
adminJourneyRouter.put("/update-journey/:id", authMiddleware, adminOnly, updateJourney);
adminJourneyRouter.delete("/delete-journey/:id", authMiddleware, adminOnly, deleteJourney);

export default adminJourneyRouter;