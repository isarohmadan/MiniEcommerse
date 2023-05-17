const validateMongoDbId = require('./../utils/validateMongodbid');
const asyncHandler = require('express-async-handler');
const coupon = require('./../models/couponModels')


const createCoupon = asyncHandler(async(req,res)=>{
    try {
        const allCoupon = await coupon.find()
        const isAviable = await allCoupon.map(coupon => coupon.name)
        .filter(name=>name === req?.body?.name)
        if(isAviable){
            throw new Error("Diskon Sudah Tersedia")
        }
        const createCoupon = await coupon.create(req?.body);
        res.json(createCoupon)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllCoupon = asyncHandler(async(req,res)=>{
    try {
        const findCoupon = coupon.find()
        res.json(findCoupon)
    } catch (error) {
        throw new Error(error)
    }
})


const singleCoupon = asyncHandler(async(req,res)=>{
    try {
        const findSingleCoupon = coupon.findById(req.query.id)
        res.json(findSingleCoupon)
    } catch (error) {
        throw new Error(error)
    }
})

const updateCoupon = asyncHandler(async(req,res)=>{
    try {
        const findAndUpdate = coupon.findByIdAndUpdate(req.params.id,req?.body,{
            new : true
        })
        res.json(findAndUpdate)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteCoupon = asyncHandler (async(req,res)=>{
    try {
        const deleteCoupon = coupon.findByIdAndRemove(req.params.id)
        if(deleteCoupon){
            res.json({
                "status" : "data berhasil di hapus",
                "data" : deleteCoupon
            })
        }else{
            throw new Error("can't find the data")
        }
    } catch (error) {
        throw new Error()
    }
})

module.exports = {createCoupon , getAllCoupon, singleCoupon, updateCoupon , deleteCoupon}