const brand = require('../models/brandModels');
const asyncHandler = require('express-async-handler');


const allBrand = asyncHandler(async(req,res)=>{
    try {
        const dataBrand = await brand.find()
        res.json(dataBrand)
    } catch (error) {
        throw new Error(error);
    }
})

const getSingleBrand= asyncHandler(async(req,res)=>{
    try{
        const singleData = await brand.findById(req.params.id);
        res.json(singleData);
    }catch(error){
        throw new Error(error)
    }
})

const createBrand = asyncHandler(async(req,res)=>{
    try {
        console.log(req.body)
        const createBrand = await brand.create(req.body);
        res.json(createBrand)
    } catch (error) {
        throw new Error("Brand tidak boleh duplikat dan Brand wajib diisi")
    }
})

const updateBrand = asyncHandler(async(req,res)=>{
    try{
        await brand.findByIdAndUpdate(req.params.id,req?.body,{
            new:true
        })
        const findUpdated = await brand.findById(req.params.id)
        res.json(findUpdated)
    }catch(error){
        throw new Error(error)
    }
})

const deleteBrand = asyncHandler(async(req,res)=>{
    try { 
        const dataBrand = await brand.findByIdAndRemove(req.params.id);
        if (dataBrand) {
            res.json({
                "status" : "data berhasil di hapus",
                "data" : dataBrand
            })
        }else{
            throw new Error("can't find the data")
        }
        
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    allBrand,
    createBrand,
    updateBrand,
    deleteBrand,
    getSingleBrand
}