import Book from "../models/book.model.js";
import redis from "../lib/redis.js";

export const getWishListBooks = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const books = await Book.find({ _id: { $in: req.user.wishList.map(item => item.book) } });
    res.json(books);
  } catch (error) {
    console.error("Error in getWishListBooks controller:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const toggleWishList = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    const user = req.user;

    if (book) {
      // Toggle the book's isWishListed status
      book.isWishListed = !book.isWishListed;

      // Update the user's wishlist array
      if (book.isWishListed) {
        // Add to wishlist
        user.wishList.push({ book: book._id });
      } else {
        // Remove from wishlist
        user.wishList = user.wishList.filter(
          (item) => item.book.toString() !== book._id.toString()
        );
      }

      // Save both the book and the user
      await Promise.all([book.save(), user.save()]);
      await updateWishListCache();

      return res.json(book);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    console.error("Error in toggleWishList function:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateWishListCache = async () => {
  try {
    const wishListBooks = await Book.find({ isWishListed: true }).lean();
    await redis.set("WishList_books", JSON.stringify(wishListBooks));
  } catch (error) {
    console.error("Error in updateWishListCache function:", error.message);
  }
};
