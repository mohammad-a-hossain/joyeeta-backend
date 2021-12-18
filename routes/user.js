const express = require('express')
const router = express.Router()
const { createUser } = require('../controllers/userController')




router.post('/signin',(req,res)=>{

})
router.post('/signup',createUser)

module.exports = router