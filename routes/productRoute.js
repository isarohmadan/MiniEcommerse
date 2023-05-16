const express = require('express')
const router = express.Router();
const {createProduct,getAllProducts,getProduct,updateProduct,deleteProduct, addWIshList,ratingProduct} = require('./../controllers/productController')
const {authMiddleware,isAdmin} = require('./../middlewares/authMiddleware')

router.post('/create',authMiddleware,isAdmin,createProduct)
router.get('/products',getAllProducts)
router.get('/:id',getProduct)
router.put('/addWishList',authMiddleware,isAdmin,addWIshList)
router.put('/ratings',authMiddleware.ratingProduct)
router.put('/:id',authMiddleware,isAdmin,updateProduct)
router.delete('/:id',authMiddleware,isAdmin,deleteProduct)

module.exports = router