const express = require('express')
const router = express.Router()
const { signup,signin} = require('../../controllers/admin/authController')
const { validateSignupRequest,validateSigninRequest, isRequestValidated}= require('../../validator/userValidator')




router.post('/admin/signin',validateSigninRequest,isRequestValidated,signin)
router.post('/admin/signup',validateSignupRequest,isRequestValidated,signup)

// router.post('/profile',requireSingin,(req,res)=>{
//      res.status(200).json({
//         user:'profile '
//     })
   
// })
   

module.exports = router