const express = require('express')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const { getAllCoupon, createCoupon, singleCoupon , updateCoupon, deleteCoupon } = require('../controllers/couponController')
const router = express.Router()


router.post('/',authMiddleware,isAdmin,createCoupon)
router.get('/',authMiddleware,isAdmin,getAllCoupon)
router.get('/:id',authMiddleware,isAdmin,singleCoupon)
router.put('/',authMiddleware,isAdmin,updateCoupon)
router.delete('/:id',authMiddleware,isAdmin,deleteCoupon)


module.exports = router