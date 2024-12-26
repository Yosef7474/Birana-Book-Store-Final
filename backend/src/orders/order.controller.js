const Order = require("./order.model");
const Book = require("../books/book.model");
const User = require('../user/user.model');
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRETT_KEY;

const createOrder = async (req, res) => {
  try {
    const { books, totalAmount, email, name, title } = req.body;
    // Validate user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Validate stock and update quantities
    for (const bookOrder of books) {
     
      const book = await Book.findById(bookOrder._id); // Use bookId in request
      if (!book || book.quantity < bookOrder.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${book?.title || 'unknown book'}. Requested: ${bookOrder.quantity}, Available: ${book?.quantity}`,
        });
      }
      book.quantity -= bookOrder.quantity;
      await book.save();
    }

    // Create the order
    const newOrder = await Order.create({
      name,
      email,
      books,
      totalAmount,
      paymentStatus: 'Pending', // Add paymentStatus logic if needed
    });

    // Generate token (optional)
    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      message: "Order placed successfully!",
      // email: user.email,
      token: token,
      order: newOrder,
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Failed to place order', error });
  }
};

const getOrderHistory = async (req, res) => {
  try {
    const { email } = req.user; // Assuming you're using authentication middleware
    const orders = await Order.find({ email }).populate("books._id", "title price");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ message: "Failed to fetch order history" });
  }
};

module.exports = {
  createOrder,
  getOrderHistory,
};

// 14132268
