const Product = require('../models/Product')
const multer = require('multer')
const shortId =require('shortid')
const slugify = require('slugify')





exports.addProduct =(req,res)=>{

        //res.status(200).json({file:req.file, body:req.body})
        //res.status(200).json({file:req.files, body:req.body})

     const {name, price, description,quantity, category,createdBy} = req.body

     let productPics =[]

     if(req.files.length > 0){
         productPics =req.files.map(file => {
             return {img:file.filename}
         })
     }

     const product = new Product({
        name:name,
         price,
         slug:slugify(name),
          description,
          productPics,
          quantity,
           category,
           createdBy:req.user._id
     })

     product.save(((error,product)=>{
         if(error) return res.status(400).json({error})
         console.log(error)
          if(product){
              return res.status(201).json({product})
          }
     }))

    }