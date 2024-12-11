import Book from "../models/book.model.js";

export const getWishListBooks = async (req, res) => {
  try {
    // Extract book ObjectIds from the user's wishlist
    const bookIds = req.user.wishList.map((item) => item.book);

   // Fetch the books that match the ids in the wishlist
   const books = await Book.find({ _id: { $in: bookIds } });


    //add quantity for each book
    const wishList = books.map((book) => {
      const item = req.user.wishList.find(
        (wishListItem) => wishListItem.book.toString() === book._id.toString()
      );
      return { ...book.toJSON() };
    });

    res.json(wishList);
  } catch (error) {
    console.log("error in getWishListBooks controller", error.message);
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

      return res.json(book);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    console.error("Error in toggleWishList function:", error.message);
    res.status(500).json({ message: error.message });
  }
};
