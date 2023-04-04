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
    try {       
        const queryObj = {...req.query}
        const excludeFields = ["Page","Sort","Limit","Fields"]
        excludeFields.forEach((ts)=> delete queryObj[ts])  
        let querystr = JSON.stringify(queryObj)
        querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g, (match)=> `$${match}`)
        let query = product.find(JSON.parse(querystr))
        // sorting
        if(req.query.Sort){   
            const sortBy = req.query.Sort.split(',').join(" ");
            console.log(sortBy)
            query = query.sort(sortBy)
        }else{
            query = query.sort("createdAt")
        }
        // limiting the fields
        if(req.query.Fields){
            const fields = req.query.Fields.split(',').join(" ");
            query = query.select(fields)
        }else{
            query = query.select('-__v') 
        }

        // pagination

        const page = req.query.Page;
        const limit = req.query.Limit;
        const skip = (page-1) * limit;
        query = query.skip(skip).limit(limit)
        if(req.query.Page){
            const productCount = await product.countDocuments()    
            if(skip >= productCount) throw new Error("page does not exist")
        }
        const result = await query
        res.json(result)
    } catch (error) {
        throw new Error()
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