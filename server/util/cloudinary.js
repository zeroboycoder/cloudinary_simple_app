require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
   //    cloud_name: "pyaesonekhant",
   //    api_key: "218558448777178",
   //    api_secret: "nN7bSMqUTKJ7senRQQ7ITCp5ibI",
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
