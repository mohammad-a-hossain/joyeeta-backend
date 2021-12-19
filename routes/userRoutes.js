const express = require('express')
const router = express.Router()
const { signup,signin,requireSingin} = require('../controllers/userController')




router.post('/signin',signin)
router.post('/signup',signup)

// router.post('/profile',requireSingin,(req,res)=>{
//      res.status(200).json({
//         user:'profile '
//     })
   
// })
   

module.exports = router