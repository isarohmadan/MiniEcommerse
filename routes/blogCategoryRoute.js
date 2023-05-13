const express = require('express');
const routes = express.Router()
const {authMiddleware,isAdmin} = require('../middlewares/authMiddleware')
const {allCategory,createCategory,updateCategory,deleteCategory,getSingleCats} = require('../controllers/blogCategoryController.js')


routes.put('/:id',authMiddleware,isAdmin, updateCategory);
routes.get('/:id',getSingleCats)
routes.get('/',allCategory)
routes.post('/create',authMiddleware,isAdmin,createCategory)
routes.delete('/:id',authMiddleware,isAdmin,deleteCategory)


module.exports = routes