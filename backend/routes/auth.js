import express from "express";
import { verifySession } from "../middleware/auth.js";
import { login, getMyProfile } from "../controllers/auth.js";

const router = express.Router();

// router.get("/me", verifySession, getMyProfile);
router.post('/login', login);

module.exports = router;
export default router;