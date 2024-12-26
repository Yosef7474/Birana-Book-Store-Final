const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hash before saving
  preferences: {
    type: [String],
    required: true,
  }, 
  ratings: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      rating: { type: Number, min: 1, max: 5 },
    },
  ],
  comments: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }], // Optional
  role: { type: String, enum: ['user', 'user'], default: 'user' }, // For privileges
});

const User = mongoose.model('User', userSchema);

module.exports = User;
