const express = require('express')

const { signup,signin} = require('../controllers/userController')
const { validateSignupRequest,validateSigninRequest, isRequestValidated}= require('../validator/userValidator')
const router = express.Router()



router.post('/signin',validateSigninRequest,isRequestValidated,signin)
router.post('/signup',validateSignupRequest,isRequestValidated,signup)


module.exports = router