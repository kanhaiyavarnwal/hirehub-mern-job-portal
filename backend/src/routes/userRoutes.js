import express from "express";
const router = express.Router();

import { sendOTP, signup, login, adminLogin } from "../controllers/auth.js";
import adminAuth from "../middleware/adminAuth.js";

router.post("/send-otp", sendOTP);
router.post("/signup", signup);
router.post("/login", login);
router.post("/adminLogin", adminLogin)

export default router;