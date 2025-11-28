import express from "express";
import { verifySession } from "../middleware/auth.js";
import { getMyProfile } from "../controllers/auth.js";

const router = express.Router();

router.get("/me", verifySession, getMyProfile);
router.get('/');


export default router;