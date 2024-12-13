import express from "express";
import { createBooks, deleteBook, getAllBooks, getBooksByAuthor, getBooksByGenre, getFeaturedBooks, getRecommendedBooks, toggleFeaturedBooks } from "../controllers/book.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/",protectRoute,adminRoute,getAllBooks);
router.get("/featured",getFeaturedBooks);
router.patch("/:id",toggleFeaturedBooks);
router.get("/recommended",getRecommendedBooks);
router.get("/genre/:genre",getBooksByGenre);
router.get("/:author",getBooksByAuthor);
router.post("/",protectRoute,adminRoute,createBooks);
router.delete("/:id",protectRoute,adminRoute,deleteBook);

export default router;