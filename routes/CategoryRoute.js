const express = require('express')

const { addCategory,getCategory } = require('../controllers/categoryController');
const{ requireSignin,adminMiddlewear} = require('../Middleweare/requireLogin')

const router = express.Router()


router.post('/category/create',requireSignin,adminMiddlewear,addCategory)
router.get('/category/getCategory',getCategory)


module.exports = router 