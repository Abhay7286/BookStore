import express from "express";
import { getAllBooks, getFeaturedBooks } from "../controllers/book.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/",protectRoute,adminRoute,getAllBooks);
router.post("/",protectRoute,adminRoute,createBooks);
router.get("/featured",getFeaturedBooks);

export default router;