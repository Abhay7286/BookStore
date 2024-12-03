import Book from "../models/book.model.js";

export const getWhishListBooks = async (req, res) => {
  try {
    const books = await Book.find({ _id: { $in: req.user.whishList } });

    res.json(books);
  } catch (error) {
    console.log("error in getWhishListBooks controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const addToWhishList = async (req, res) => {
  try {
    const { bookId } = req.body;
    const user = req.user;

    const existingItem = user.whishList.find((item) => item.id == bookId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.whishList.push({ bookId });
    }
    await user.save();
    res.json(user.whishList);
  } catch (error) {
    console.log("error in addToWhishList controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const removeFromWhishList = async (req, res) => {
  try {
    const { bookId } = req.body;
    const user = req.user;

    if (!bookId) {
      user.whishList = [];
    }

    user.whishList = user.whishList.filter((item) => item.id != bookId);
    await user.save();
    res.json(user.whishList);
  } catch (error) {
    console.log("error in removeFromWhishList controller", error.message);
    res.status(500).json({ message: error.message });
  }
};
