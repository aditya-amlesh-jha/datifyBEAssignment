import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { apiLimiter } from '../middlware/rateLimit.js';

const router = express.Router();

router.post("/register",apiLimiter,registerUser);
router.post("/login",apiLimiter, loginUser);

export default router;