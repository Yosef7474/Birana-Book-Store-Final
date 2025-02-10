const Book = require('./book.model');
const User = require("../user/user.model")
const nodemailer = require('nodemailer');
const sendEmail = require('./util.email');
const path = require('path');
// import multer from 'multer'





// post book
const postAbook = async (req, res) => {
    try {
        const newBook = await Book({...req.body});
        console.log(newBook);
        await newBook.save();
        res.status(200).send({messege: "Book posted succesfully", book: newBook})
    } catch (error) {
        console.error("error creating book", error)
        res.status(500).send({messege: "failed to create book"})
    }
}

// get book
const getAllBooks = async (req, res) => {
    try {
        const {id} = req.params;
        const books = await Book.find(id).sort({createdAt: -1});
        res.status(200).send(books)
        
    } catch (error) {
        console.error("error fetching book", error)
        res.status(500).send({messege: "failed to fetch book"})
    }
}
// get single Book
const getSingleBook = async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id)
        if(!book){
            res.status(404).send({messege: "book not found"})
        }
        res.status(200).send(book)
    } catch (error) {
        console.error("error fetching book", error)
        res.status(500).send({messege: "failed to fetch book"})
    }
}

// update book data
const UpdateBook = async (req, res) => {
    try {
        const {id} = req.params;
        const UpdateBook = await Book.findByIdAndUpdate(id, req.body, {new: true});
        if(!UpdateBook){
            res.status(404).send({messege: "book not found"})
        }
        res.status(200).send({
            messege: "book updated succesfully", 
            book: UpdateBook
        })
    } catch (error) {
        console.error("error updating book", error)
        res.status(500).send({messege: "failed to update book"})
    }
}

// delete Book
const deleteABook = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedBook = await Book.findByIdAndDelete(id)
        if(!deletedBook){
            res.status(404).send({message: "Book not found"})
        }
        res.status(200).send({
            message: "book deleted succesfully",
            book: deletedBook
        })
    }catch(error) {
        console.error("error deleting a book");
        res.status(500).send({message: "faild to delete a book"})
    }
}

const recommendedBooks = async (req,res) => {
    try {
        const preferences = req.user.preferences; 
    
        if (!preferences || preferences.length === 0) {
          return res
            .status(400)
            .json({ message: "User preferences not set. Update preferences to get recommendations." });
        }
    
        // Find books that match the user's preferences
        const recommendedBooks = await Book.find({
            category: { $in: preferences },
        });
    
        res.json(recommendedBooks);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while fetching recommendations." });
      }
}


const rateBook = async (req, res) => {
    try {
        const { id } = req.params; // Book ID
        const { email, rating } = req.body; // Use email instead of userId
    
        if (!email || !rating) {
          return res.status(400).json({ message: "Email and rating are required." });
        }
    
        const book = await Book.findById(id);
        if (!book) {
          return res.status(404).json({ message: "Book not found" });
        }
    
        const existingRating = book.ratings.find((r) => r.email === email);
        if (existingRating) {
          return res.status(400).json({ message: "You have already rated this book." });
        }
    
        book.ratings.push({ email, rating });

         // Calculate the new average rating
    const totalRatings = book.ratings.reduce((sum, r) => sum + r.rating, 0);
    book.averageRating = totalRatings / book.ratings.length;
        await book.save();
    
        res.status(200).json({ message: "Rating added successfully", ratings: book.ratings });
      } catch (error) {
        console.error("Error adding rating:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
      }
}
// Comment
const commentBook = async(req, res) =>{
    try {
        const { id } = req.params;
        const {email, comment} = req.body;

        const book = await Book.findById(id);
        if (!book) {
          return res.status(404).json({ message: "Book not found" });
        }

        book.comments.push({ email, comment });

        await book.save();

        res.status(200).json({ message: "Comment added successfully", comments: book.comments });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const deleteComment = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteComment = await Book.findByIdAndDelete(id)
        if(!deleteComment){
            res.status(404).send({message: "Book not found"})
        }
        res.status(200).send({
            message: "book deleted succesfully",
            comment: deleteComment
        })
    }catch(error) {
        console.error("error deleting a comment");
        res.status(500).send({message: "faild to delete a comment"})
    }
}



const searchBooks = async (req, res) => {
    try {
      const { query } = req.query;
  
      if (!query) {
        return res.status(400).json({ message: "Query parameter is required" });
      }
  
      // Debugging: Log the incoming query
      console.log("Search query:", query);
  
      // Perform the search
      const books = await Book.find({
        title: { $regex: query, $options: "i" },
      });
  
      // Debugging: Check the results
      console.log("Books found:", books);
  
      res.status(200).json(books);
    } catch (error) {
      console.error("Error in searchBooksByTitle:", error.message);
      res.status(500).json({ message: "Error searching books", error });
    }
  }



module.exports = {
    postAbook, 
    getAllBooks,
    getSingleBook,
    UpdateBook,
    deleteABook,
    recommendedBooks,
    rateBook,
    commentBook,
    deleteComment,
    searchBooks
}