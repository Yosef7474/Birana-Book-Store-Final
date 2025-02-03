// backend/middleware/upload.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../../cloudinaryconfig');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bookstore', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'jpeg'], // Supported file formats
  },
});

const upload = multer({ storage });

module.exports = upload;
