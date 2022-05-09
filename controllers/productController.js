const Product = require('../models/Product')
const multer = require('multer')
const shortId =require('shortid')
const slugify = require('slugify')
const Category= require('../models/Category')








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

    // exports.getProductsBySlug =(req,res)=>{
    //     const {slug} = req.params
    //     console.log(slug)
    //   Category.findOne({slug:slug})
    //   .select('_id type')
    //     .exec((error, category)=>{
    //         if(error){
    //           return res.status(400).json({error})
    //         }
    //     if(category){
    //         Product.find({category:category._id})
    //         .exec((error, products)=>{
    //             if(error){
    //                 return res.status(400).json({error})
    //               }
    //               if(products.length > 0){
    //                 res.status(200).json({
    //                 products,
    //             productsByPrice:{
    //                 under200: products.filter(product => product.price <= 200),
    //                 under300: products.filter(product => product.price > 200 && product.price <=300 ),under500: products.filter(product => product.price > 300 && product.price <=500 ),
    //                 under800: products.filter(product => product.price > 500 && product.price <=800 ),
    //                 under1000: products.filter(product =>product.price > 800 && product.price <=1000),
    //                 under2000: products.filter(product =>product.price >1000 && product.price<=2000)            
    //              } 
    //             }) 
    //               }
    //            return res.status(200).json({products})
    //         })
    //     }
         
    //  })
        
    // }


    exports.getProductsBySlug =(req,res)=>{
        const {slug} = req.params
        console.log()
      Category.findOne({slug:slug})
      .select("_id type")
        .exec((error, category)=>{
            if(error){
              return res.status(400).json({error})
            }
        if(category){
            Product.find({category:category._id})
            .exec((error, products)=>{
                if(error){
                    return res.status(400).json({error})
                  }
                if(products.length > 0){
                    res.status(200).json({
                    products,
                    priceRange: {
                        under5k: 5000,
                        under10k: 10000,
                        under15k: 15000,
                        under20k: 20000,
                        under30k: 30000,
                      },
                productsByPrice:{
                    under200: products.filter(product => product.price <= 200),
                    under300: products.filter(product => product.price > 200 && product.price <=300 ),under500: products.filter(product => product.price > 300 && product.price <=500 ),
                    under800: products.filter(product => product.price > 500 && product.price <=800 ),
                    under1000: products.filter(product =>product.price > 800 && product.price <=1000),
                    under2000: products.filter(product =>product.price >1000 && product.price<=2000)            
                 }, 
                }) 
                }else{
                    return res.status(200).json({products})
                }
               
               

               
            })
        }
         
     })
        
    } 