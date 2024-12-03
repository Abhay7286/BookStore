import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addToWhishList, getWhishListBooks, removeFromWhishList } from "../controllers/whishlist.controller.js";

const router = express.Router();

router.get("/", protectRoute, getWhishListBooks);
router.post("/", protectRoute, addToWhishList);
router.delete("/", protectRoute, removeFromWhishList);

export default router;