const express = require('express')
const router = express.Router()
const {createBlog,showBlog,findBlog,editBlog,removeBlog,liketheBlog,dislikeTheBlog} = require('./../controllers/blogController')
const {authMiddleware,isAdmin} = require('./../middlewares/authMiddleware')

router.post('/create',authMiddleware,isAdmin,createBlog)
router.put('/like',authMiddleware,liketheBlog)
router.put('/dislike',authMiddleware,dislikeTheBlog)
router.get('/',showBlog)
router.get('/:id',findBlog)
router.put('/update/:id',authMiddleware,isAdmin,editBlog)
router.delete('/:id',authMiddleware,isAdmin,removeBlog)
module.exports = router