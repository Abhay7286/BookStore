import express  from "express";
import { getOrder, getProfile, login, logout, refreshToken, setAddress, setProfile, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/refresh-token",refreshToken);
router.post("/signup", signup);
router.post("/login",login);
router.post("/logout",logout);
router.patch("/profile-update", protectRoute, setProfile);
router.patch("/address-update", protectRoute, setAddress);
router.get("/profile", protectRoute, getProfile);
router.get("/orders", protectRoute, getOrder);

export default router;

