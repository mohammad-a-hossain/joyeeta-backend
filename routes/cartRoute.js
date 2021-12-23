const express = require('express')

const {addItemToCart} = require('../controllers/cartController');
const{ requireSignin,userMiddlewear} = require('../Middleweare/requireLogin')

const router = express.Router()


router.post('/user/cart/create',requireSignin,userMiddlewear,addItemToCart)
//router.get('/cart/getCart',getCategory)


module.exports = router 