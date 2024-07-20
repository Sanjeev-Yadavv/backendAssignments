require('dotenv').config();
const nodemon = require('nodemon')
const express = require('express');
const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const path = require('path')
const fs = require('fs')
// const {CloudinaryStorage} = require('multer-storage-cloudinary-v2');

const app = express();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = multer.diskStorage({
    destination: function(req,file, cb) {
        cb(null,'src/uploads/');
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + '-'+ file.originalname);
    }
});

const upload = multer({storage:storage})

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.post('/upload', upload.single('file'), (req,res)=>{
    const filePath = req.file.path;
    // console.log(filePath)

    cloudinary.uploader.upload(filePath,{folder:'src/uploads'})
    .then(result=>{
        fs.unlinkSync(filePath);
        res.status(200).json({
            message: 'File uploaded successfully',
            imageUrl: result.secure_url,
        });
    })
    .catch(error=>{
        res.status(500).json({
            message: 'file upload failed',
            error: error.message,
        });
    });
});


app.listen(3000, () =>{
    console.log("server is running on 3000 ")
});