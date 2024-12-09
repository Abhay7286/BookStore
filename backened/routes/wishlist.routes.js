import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addToWishList, getWishListBooks, removeFromWishList } from "../controllers/wishlist.controller.js";

const router = express.Router();

router.get("/", protectRoute, getWishListBooks);
router.post("/", protectRoute, addToWishList);
router.delete("/", protectRoute, removeFromWishList);

export default router;