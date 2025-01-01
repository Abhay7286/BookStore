import express  from "express";
import { getProfile, login, logout, refreshToken, setProfile, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/refresh-token",refreshToken);
router.post("/signup", signup);
router.post("/login",login);
router.post("/logout",logout);
router.patch("/profile-update", protectRoute, setProfile);
router.patch("/address-update", protectRoute, setProfile);
router.get("/profile", protectRoute, getProfile);

export default router;

