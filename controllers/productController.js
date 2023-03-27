const product = require('./../models/productModels');
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')



const createProduct = asyncHandler(async(req,res)=>{
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const newProduct = await product.create(req.body)
        res.json(newProduct)
    } catch (error) {
        throw new Error(error)
    }
})
const getAllProducts = asyncHandler(async(req,res)=>{
    const urlParams = req.query
    console.log(urlParams)
    try {
        const getAll = await product.find({
            category : urlParams?.category,
            brand : urlParams?.brand
        })
        res.json(getAll)
    }catch(err){
        throw new Error(err)
    }
})
const getProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params
    try {
       const findIdProduct = await product.findById(id)

        if(!findIdProduct) throw new Error("connot find the product")
        res.json(findIdProduct)
    } catch (error) {
        throw new Error("cannot find the product")
    }
})

const updateProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const newProduct = await product.findByIdAndUpdate(id,{
            title : req.body.title,
            slug : req.body.slug,
            description : req.body.description,
            price : req.body.price,
            quantities : req?.body?.quantities,
            sold : req?.body?.sold,
            color : req.body.color,
            category : req.body.category,
        },
        {
            new : true
        }
        )
        res.json(newProduct)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params
    try {
        const deleteProduct = await product.findByIdAndDelete(id)
        if(!deleteProduct){
            res.json({
                msg : "gagal hapus"
            })
        }
        res.json({
            msg:"produk telah di hapus"
        })
    } catch (error) {
        throw new Error()
    }
})
module.exports = {createProduct,getAllProducts,getProduct,updateProduct,deleteProduct}    