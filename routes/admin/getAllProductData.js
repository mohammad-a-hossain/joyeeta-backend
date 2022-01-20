const express = require('express')
const { getAllProductData } = require('../../controllers/admin/getAllProductData')
const router =express.Router()


router.post('/getAllProductData',getAllProductData)

module.exports = router