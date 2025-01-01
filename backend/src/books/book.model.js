const mongoose = require('mongoose');


const ratingSchema = new mongoose.Schema({
  email: {
    type: String, // Changed from ObjectId to String
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

const commentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
  
})

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
      type: String,
      default: "unknown"
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    trending: {
        type: Boolean,
        required: true,
    },
    coverImage: {
      type: String,
      required: true,  
},
    quantity: {
      type: Number,
      required: true,
      default: 1
    },

    ratings: [ratingSchema],
    averageRating: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
    
    oldPrice:{ 
     type: Number,
     default: 0.00,
    },
    newPrice:{ 
     type: Number,
     default: 0.00
    },

   createdAt: {
    type: Date,
    default: Date.now,
   },

  }, {
    timestamps: true,
 

  });

  

  const Book = mongoose.model('Book', bookSchema);

  module.exports = Book;