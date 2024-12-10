import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {  getWishListBooks, toggleWishList } from "../controllers/wishlist.controller.js";

const router = express.Router();

router.get("/", protectRoute,getWishListBooks);
router.patch("/:id",protectRoute,toggleWishList);

export default router;