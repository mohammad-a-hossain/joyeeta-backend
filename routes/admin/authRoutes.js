const express = require('express')
const router = express.Router()
const { signup,signin,requireSingin} = require('../../controllers/admin/authController')




router.post('/admin/signin',signin)
router.post('/admin/signup',signup)

// router.post('/profile',requireSingin,(req,res)=>{
//      res.status(200).json({
//         user:'profile '
//     })
   
// })
   

module.exports = router