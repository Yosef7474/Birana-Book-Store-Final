const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('../../cloudinaryconfig'); // Adjust the path as needed
const path = require('path');
// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'bookstore', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file types
        public_id: (req, file) => `cover_${Date.now()}_${file.originalname}`, // Unique file name
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
