import Book from "../models/book.model.js";

export const getCartBooks = async (req, res) => {
    try {
        const books = await Book.find({_id:{$in: req.user.cartItems}});

        //add quantity for each book 
        const cartItems = books.map((book) => {
          const item = req.user.cartItems.find(cartItem => cartItem.id === book.id);
          return {...book.toJSON(), quantity: item.quantity };
        });

        res.json(cartItems);
    } catch (error) {
        console.log("error in getCartBooks controller", error.message);
        res.status(500).json({message: error.message});
    }
}

export const addToCart = async (req, res) => {
  try {
    const { bookId } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find((item) => item.id == bookId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({ bookId });
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("error in addToCart controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { bookId } = req.body;
    const user = req.user;

    if (!bookId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id != bookId);
    }
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("error in removeAllFromCart controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    const existingItem = user.cartItems.find((item) => item.id == bookId);

    if (existingItem) {
      if (quantity == 0) {
        user.cartItems = user.cartItems.filter((item) => item.id != bookId);
        await user.save();
        res.json(user.cartItems);
      }
      existingItem.quantity = quantity;
      await user.save();
      res.json(user.cartItems);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    console.log("error in updateQuantity controller", error.message);
    res.status(500).json({ message: error.message });
  }
};