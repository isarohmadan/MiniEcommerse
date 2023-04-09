const express = require('express')
const router = express.Router()
const {createBlog} = require('./../controllers/blogController')
const {authMiddleware,isAdmin} = require('./../middlewares/authMiddleware')

router.post('/create',authMiddleware,isAdmin,createBlog)

module.exports = router