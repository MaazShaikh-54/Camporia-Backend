import express from "express";
import {
    userProfile,
    getUserProfile,
    editUserProfile,
    deleteUserProfile
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/profile", authMiddleware, userProfile);
userRouter.put("/edit-profile", authMiddleware, editUserProfile);
userRouter.delete("/delete-profile", authMiddleware, deleteUserProfile);

export default userRouter;