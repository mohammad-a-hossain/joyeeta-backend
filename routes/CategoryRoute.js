const express = require('express')

const { addCategory,getCategory } = require('../controllers/categoryController');


const router = express.Router()


router.post('/category/create',addCategory)
router.get('/category/getCategory',getCategory)


module.exports = router 