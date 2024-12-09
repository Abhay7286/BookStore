import Book from "../models/book.model.js";

export const getWishListBooks = async (req, res) => {
  try {
    const books = await Book.find({ _id: { $in: req.user.wishList } });

    res.json(books);
  } catch (error) {
    console.log("error in getWishListBooks controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const addToWishList = async (req, res) => {
  try {
    const { bookId } = req.body;
    const user = req.user;

    const existingItem = user.wishList.find((item) => item.id == bookId);

    if (existingItem) {
      res.status(400).json('item already exists in wishlist');
    } else {
      user.wishList.push({ bookId });
    }
    await user.save();
    res.json(user.wishList);
  } catch (error) {
    console.log("error in addToWishList controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const removeFromWishList = async (req, res) => {
  try {
    const { bookId } = req.body;
    const user = req.user;

    if (!bookId) {
      user.wishList = [];
    }

    user.wishList = user.wishList.filter((item) => item.id != bookId);
    await user.save();
    res.json(user.wishList);
  } catch (error) {
    console.log("error in removeFromWishList controller", error.message);
    res.status(500).json({ message: error.message });
  }
};
