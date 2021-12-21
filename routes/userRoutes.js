const express = require('express')

const { signup,signin} = require('../controllers/userController')
const { validateSignupRequest, isRequestValidated}= require('../validator/userValidator')
const router = express.Router()



router.post('/signin',signin)
router.post('/signup',isRequestValidated,validateSignupRequest,signup)


module.exports = router