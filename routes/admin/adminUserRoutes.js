import express from "express";
import authMiddleware, { adminOnly } from "../../middleware/authMiddleware.js";
import {
    getUsers,
    updateUser,
    deleteUser
} from "../../controllers/admin/adminUserController.js";

const adminUserRouter = express.Router();

adminUserRouter.get("/users", authMiddleware, adminOnly, getUsers);
adminUserRouter.put("/update-user/:id", updateUser);
adminUserRouter.delete("/delete-user/:id", deleteUser);

export default adminUserRouter;