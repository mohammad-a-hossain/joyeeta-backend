const Product = require('../models/Product')
const multer = require('multer')
const shortId =require('shortid')






exports.addProduct =(req,res)=>{

        //res.status(200).json({file:req.file, body:req.body})
        res.status(200).json({file:req.files, body:req.body})
    }