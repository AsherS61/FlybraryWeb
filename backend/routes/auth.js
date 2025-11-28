import express from "express";
import { verifySession } from "../middleware/auth.js";
import { getMyProfile } from "../controllers/auth.js";

const router = express.Router();

router.get("/me", verifySession, getMyProfile);
router.get('/api/v1/auth/login')

export default router;