const express = require('express')
const {createPage, getPage} = require('../controllers/pageController')
const { upload} = require('../Middleweare/fileupload')
const { requireSignin, adminMiddlewear } = require('../Middleweare/requireLogin')
const router = express.Router()

router.post(`/page/createPage`,
upload.fields([
    { name: 'banners' },
    { name: 'products' }
]),requireSignin,adminMiddlewear, createPage)

router.get(`/page/:category/:type`,getPage)


module.exports = router