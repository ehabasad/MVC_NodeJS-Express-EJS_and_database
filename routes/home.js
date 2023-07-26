const express = require('express')
const {
    homeView
} = require('../controllers/homeController')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/',auth, homeView)

module.exports = router