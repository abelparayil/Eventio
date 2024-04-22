import express from "express";
import { adminLogin, adminSignup, isAdmin } from "../controllers/admin-controller.js";
import { verifyAdminToken } from "../middleware/event-middleware.js";
import { resetPassword } from "../controllers/admin-controller.js";

const adminRouter = express.Router();

adminRouter.get("/isAdmin", verifyAdminToken, isAdmin);

adminRouter.post("/signup", adminSignup);
adminRouter.post("/login", adminLogin);
adminRouter.post("/resetPassword", verifyAdminToken, resetPassword);

export default adminRouter;
