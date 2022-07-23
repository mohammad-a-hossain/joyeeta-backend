const express = require('express')
const {getAllData} = require('../../controllers/admin/allData')
const { requireSignin, adminMiddlewear } = require('../../Middleweare/requireLogin')

const router =express.Router()


router.post('/getAllData',requireSignin,adminMiddlewear, getAllData)

module.exports = router