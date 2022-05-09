const express = require('express')
const multer = require('multer')
const shortid = require('shortid')
const path =require('path')
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploadsCategories'))
    },
    filename: function (req, file, cb) {
      
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
  
  const upload = multer({storage})





const { addCategory,getCategory, updateCategory } = require('../controllers/categoryController');
const{ requireSignin,adminMiddlewear} = require('../Middleweare/requireLogin')



router.post('/category/create',requireSignin,adminMiddlewear,upload.single('categoryImage'),addCategory)

router.get('/category/getCategory',getCategory)

router.post('/category/updatecate',upload.array('categoryImage'),updateCategory)

module.exports = router 