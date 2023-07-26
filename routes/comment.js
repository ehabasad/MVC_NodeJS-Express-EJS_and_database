const express = require('express')
const {
    commentCreate, commentDelete
} = require('../controllers/commentController')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/:title', commentCreate)
router.delete('/:title/:id', commentDelete)

module.exports = router