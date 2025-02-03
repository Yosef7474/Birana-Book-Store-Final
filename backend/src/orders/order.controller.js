const Order = require("./order.model");
const Book = require("../books/book.model");
const User = require('../user/user.model');
const Notification = require('./notification.model')
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const JWT_SECRET = process.env.JWT_SECRETT_KEY;



const verifyPayment = async (req, res) => {
  const { txRef } = req.body;

  try {
    // Verify the payment using Chapa API
    const response = await fetch(`https://api.chapa.co/v1/transaction/verify/${txRef}`, {
      headers: {
        Authorization: `Bearer CHASECK_TEST-KY87RcI3yYVAFSkn5kNApWrWstjQuFlg`,
      },
    });
    const data = await response.json();

    if (data.status === "success" && data.data.status === "success") {
      // Payment is verified. Create the order in your database.
      const order = await Order.create({
        tx_Ref: txRef,
        ...data.data.meta,
        paymentStatus: "Paid",
      });

       // Create a notification
    const notification = new Notification({
      message: `A new order was placed by ${email}`,
      type: 'order',
      orderId: savedOrder._id,
    });

    await notification.save();

    // Emit the notification to the admin via Socket.IO
    io.emit('new-order', { message: notification.message, orderId: savedOrder._id });

      return res.status(200).json({ success: true, order });
    }

    res.status(400).json({ success: false, message: "Payment verification failed" });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const createOrder = async (req, res) => {

  
  try {
    const { books, totalAmount, email, name, txRef } = req.body;
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
      paymentStatus: 'Paid', // Add paymentStatus logic if needed
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

const getTotalAmount = async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders
    const totalPrice = orders.reduce((sum, order) => sum + order.totalAmount, 0); // Calculate total amount
    res.status(200).json({ totalPrice });
  } catch (error) {
    console.error("Error calculating total amount:", error);
    res.status(500).json({ message: "Failed to calculate total amount", error: error.message });
  }
};


// Admin: Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()

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
    const orders = await Order.find({email});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user orders' });
  }
};

// delete Book
const deleteOrder = async (req, res) => {
  try {
      const {id} = req.params;
      const deleteOrder = await Order.findByIdAndDelete(id)
      if(!deleteOrder){
          res.status(404).send({message: "Book not found"})
      }
      res.status(200).send({
          message: "book deleted succesfully",
          order: deleteOrder
      })
  }catch(error) {
      console.error("error deleting Order");
      res.status(500).send({message: "faild to delete a Order"})
  }
}


module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  verifyPayment,
  deleteOrder,
  getTotalAmount
};

// 14132268
