// require("dotenv").config();

// const cloudinary = require('cloudinary');
// const cloudinaryStorage = require('multer-storage-cloudinary');
// const multer = require('multer');

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_KEY,
//     api_secret: process.env.CLOUD_SECRET
// });

// const storage = cloudinaryStorage({
//     cloudinary: cloudinary,
//     folder: 'sister-in-home',
//     allowedFormats: ['jpg', 'png'],
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

// const uploader = multer({
//     storage: storage
// });
// module.exports = uploader;

require('dotenv').config();
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});
var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'sister-in-home', // The name of the folder in cloudinary
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
        cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
    }
});
// var storagePhoto = cloudinaryStorage({
//     cloudinary: cloudinary,
//     folder: 'CanguroFamily', // The name of the folder in cloudinary
//     allowedFormats: ['jpg', 'png'],
//     filename: function (req, file, cb) {
//         cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
//     }
// });
const parser = multer({
    storage: storage,
    // storagePhoto: storagePhoto
});
module.exports = parser;