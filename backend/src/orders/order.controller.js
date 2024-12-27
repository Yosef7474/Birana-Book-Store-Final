const Order = require("./order.model");
const Book = require("../books/book.model");
const User = require('../user/user.model');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const JWT_SECRET = process.env.JWT_SECRETT_KEY;

const generateTxRef = (userEmail) => {
  const uniqueId = crypto.randomBytes(8).toString("hex");
  return `${userEmail}-${Date.now()}-${uniqueId}`;
};

const createOrder = async (req, res) => {

  
  try {
    const { books, totalAmount, email, name, title } = req.body;
    // Validate user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const txRef = generateTxRef(email);

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
      paymentStatus: 'Completed', // Add paymentStatus logic if needed
      txRef,
    });

    // Generate token (optional)
    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      message: "Order placed successfully!",
      // email: user.email,
      txRef,
      token: token,
      order: newOrder,
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Failed to place order', error });
  }
};


// ------------------------------------------------------------
// ----------------------------------------------------------

// Secret key for signature verification from Chapa
const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY; // Store in your environment variables

// Payment callback endpoint
const paymentCallback = async (req, res) => {
  const { tx_ref, status, signature } = req.body;

  try {
    // Verify the signature to ensure the callback is valid
    const expectedSignature = generateSignature(req.body, CHAPA_SECRET_KEY);
    if (signature !== expectedSignature) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    // Check the status of the payment
    if (status === 'success') {
      // Find the order by transaction reference (tx_ref)
      const order = await Order.findOne({ tx_ref });
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      // Update the order payment status to 'Completed'
      order.paymentStatus = 'Completed';
      await order.save();

      // Optionally, perform other actions like sending confirmation emails, etc.
      res.status(200).json({ message: 'Payment successfully processed' });
    } else {
      return res.status(400).json({ message: 'Payment failed or canceled' });
    }
  } catch (error) {
    console.error('Error handling payment callback:', error);
    res.status(500).json({ message: 'Failed to process payment callback', error });
  }
};

// Helper function to generate the expected signature for verification
function generateSignature(paymentData, secretKey) {
  const { tx_ref, amount, currency, status } = paymentData;
  const data = `${tx_ref}|${amount}|${currency}|${status}`;
  const crypto = require('crypto');
  return crypto.createHmac('sha256', secretKey).update(data).digest('hex');
}

// ----------------------------------------------------------
// ---------------------------------------------------

// Admin: Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// User: Get orders by email
const getUserOrders = async (req, res) => {
  const { email } = req.query; // Assuming email is passed as a query parameter
  try {
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    const orders = await Order.find({ userEmail: email });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user orders' });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  paymentCallback
};

// 14132268
