const express = require('express')
const router = express.Router();
const {createProduct,getAllProducts,getProduct,updateProduct,deleteProduct, addWIshList,ratingProduct,removeRating, uploadImages} = require('./../controllers/productController')
const {authMiddleware,isAdmin} = require('./../middlewares/authMiddleware');
const {uploadPhoto, productImgResize } = require('../middlewares/uploadImages');

router.post('/create',authMiddleware,isAdmin,createProduct)
router.get('/products',getAllProducts)
router.get('/:id',getProduct)
router.put('/upload/:id', authMiddleware,isAdmin,uploadPhoto.array('images',10),productImgResize,uploadImages )
router.put('/ratings',authMiddleware,ratingProduct)
router.put('/ratings/:id',authMiddleware,removeRating)
router.put('/addWishList',authMiddleware,isAdmin,addWIshList)
router.put('/:id',authMiddleware,isAdmin,updateProduct)
router.delete('/:id',authMiddleware,isAdmin,deleteProduct)

module.exports = router