const express = require('express')
const Book = require('./book.model');
const { postAbook, getAllBooks, getSingleBook, UpdateBook, deleteABook, recommendedBooks, rateBook, commentBook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const {protect} = require('../middleware/verifyUser')
const router = express.Router();



// frontend => backend server => book schema => database => send data to the server => send back to the frontend

// post is used when submit something from frontend to DB
// get when get something back from DB
// put/patch when edit or update something
// delete when delete something


//post a book
router.post("/create-book",verifyAdminToken, postAbook)

// get all books
router.get("/", getAllBooks)

// get sigle book by id
router.get("/:id", getSingleBook)

// update a book
router.put("/edit/:id",verifyAdminToken, UpdateBook)

// delete book
router.delete("/:id",verifyAdminToken, deleteABook)

// recommended books
router.get("/",protect, recommendedBooks)

// rate book
router.post("/rate/:id", protect, rateBook)

// comment
router.post("/comment/:id", protect, commentBook)


module.exports = router;