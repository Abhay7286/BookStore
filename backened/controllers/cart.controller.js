import Book from "../models/book.model.js";

export const getCartBooks = async (req, res) => {
  try {
      const bookIds = req.user.cartItems.map((item) => item.book);  // Get book ids from cart
      const books = await Book.find({ _id: { $in: bookIds } });     // Fetch books using those ids
      
      // Add quantity for each book
      const cartItems = books.map((book) => {
        const item = req.user.cartItems.find((cartItem) => String(cartItem.book) === String(book._id));
        return { ...book.toJSON(), quantity: item ? item.quantity : 0 };  // Return books with quantity
      });

      res.json(cartItems);  // Send cart items as response
  } catch (error) {
      console.log("error in getCartBooks controller", error.message);
      res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { bookId } = req.body;
    console.log(bookId)
    const user = req.user;

    // Check for existing item in cart
    const existingItem = user.cartItems.find((item) => String(item.id) === String(bookId));

    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity
    } else {
      user.cartItems.push({ book: bookId, quantity: 1 }); // Add new item
    }

    await user.save(); // Save updated user data
    res.json(user.cartItems); // Return updated cart
  } catch (error) {
    console.error("Error in addToCart:", error.message);
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
      user.cartItems = user.cartItems.filter((item) => item.id !== bookId);
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
    const existingItem = user.cartItems.find((item) => item.id === bookId);

    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item.id !== bookId);
        await user.save();
        return res.json(user.cartItems);
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
