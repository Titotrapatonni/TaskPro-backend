const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  Location: 'avatars',
  allowedFormats: ['jpg', 'png'],
  params: {
    upload_preset: 'avatars',
    transformation: [{ width: 68, height: 68, crop: 'fill', quality: 'auto:low' }],
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploader = multer({ storage: storage });

module.exports = uploader;
