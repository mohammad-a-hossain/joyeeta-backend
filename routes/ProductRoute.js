const express = require('express')
const multer = require('multer')
const shortid = require('shortid')
const path =require('path')
const router = express.Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploadsProducts'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
  
  const upload = multer({storage})


const { addProduct,getProductsBySlug, getProductDetailById } = require('../controllers/productController')


const{ requireSignin,adminMiddlewear} = require('../Middleweare/requireLogin')




router.post('/product/create',requireSignin,adminMiddlewear,
/* upload.single('productPics') */ upload.array('productPics'),addProduct)
router.get('/products/:slug',getProductsBySlug)
router.get('/product/:productId',getProductDetailById)




module.exports = router 