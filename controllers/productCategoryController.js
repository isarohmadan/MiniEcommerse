const category = require('./../models/productCategoryModels');
const asyncHandler = require('express-async-handler');


const allCategory = asyncHandler(async(req,res)=>{
    try {
        const dataCategory = await category.find()
        res.json(dataCategory)
    } catch (error) {
        throw new Error(error);
    }
})

const getSingleCats = asyncHandler(async(req,res)=>{
    try{
        const singleData = await category.findById(req.params.id);
        res.json(singleData);
    }catch(error){
        throw new Error(error)
    }
})

const createCategory = asyncHandler(async(req,res)=>{
    try {
        const createCats = await category.create(req.body);
        res.json(createCats)
    } catch (error) {
        throw new Error("Kategory tidak boleh duplikat dan Kategori wajib diisi")
    }
})

const updateCategory = asyncHandler(async(req,res)=>{
    try{
        await category.findByIdAndUpdate(req.params.id,req?.body,{
            new:true
        })
        const findUpdated = await category.findById(req.params.id)
        res.json(findUpdated)
    }catch(error){
        throw new Error(error)
    }
})

const deleteCategory = asyncHandler(async(req,res)=>{
    try { 
        const dataCats = await category.findByIdAndRemove(req.params.id);
        if (dataCats) {
            res.json({
                "status" : "data berhasil di hapus",
                "data" : dataCats
            })
        }else{
            throw new Error("can't find the data")
        }
        
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    allCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    getSingleCats
}