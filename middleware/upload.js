
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utls/cloudinary');
require("dotenv").config()
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profilePics', 
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg'],
  },
});

const upload = multer({ storage });

module.exports = upload;
