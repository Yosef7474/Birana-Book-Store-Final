const mongoose = require('mongoose');

const bookOrderSchema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book", // Reference to the Book model
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  });

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    email: { type: String, ref: 'User', required: true },
    address: {
        city: {
            type: String,
            
        }
    },
    phone: {
        type: Number,
        // required: true
    },
    totalAmount: { type: Number, required: true, default: 1 },
    paymentStatus: { type: String, enum: ['Failed', 'Paid'] },
  
    books: [bookOrderSchema],
    createdAt: { type: Date, default: Date.now },
},
{
    timestamps:true,
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;