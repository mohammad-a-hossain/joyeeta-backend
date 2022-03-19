const express = require('express')
const {getAllData} = require('../../controllers/admin/allData')

const router =express.Router()


router.post('/getAllData',getAllData)

module.exports = router