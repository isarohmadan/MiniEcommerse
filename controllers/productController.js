const product = require('./../models/productModels');
const user = require('./../models/userModels.js');
const asyncHandler = require('express-async-handler')
const slugify = require('slugify');
const { validateMongoDbId } = require('../utils/validateMongodbid');
const dbConnect = require('./../config/dbConnect')
const { ObjectId } = require('mongodb');

//  creating product
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

// getting all the product with query params 
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

// getting a single product using id
const getProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params
    try {
       const findIdProduct = await product.findById(id)
        // validation product
        if(!findIdProduct) throw new Error("connot find the product")
        res.json(findIdProduct)
    } catch (error) {
        throw new Error("cannot find the product")
    }
})

// update method 
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

// method delete product
const deleteProduct = asyncHandler(async(req,res)=>{
    // req to parameter
    const {id} = req.params
    try {
        // find the data
        const deleteProduct = await product.findByIdAndDelete(id)
        // response validation
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



// method adding some wishlist 
const addWIshList = asyncHandler(async(req,res)=>{
    const {prodId} = req.body;
    const users = res?.user;

    // feth wishlist  di user
    let isIdAviable = []
    for(let i = 0; i < users.wishlist.length ; i++){
        if(ObjectId.isValid(prodId) && users.wishlist[i].equals(prodId)){
            isIdAviable.push(prodId)
        }
    }

    // mengecek apakah ada produk di wishlis
    if(isIdAviable.length === 0){
        await user.findByIdAndUpdate(res?.user.id,{
            $push : {wishlist : prodId}
        },{new:true})
    }else{
        await user.findByIdAndUpdate(res?.user.id,{
            $pull : {wishlist : prodId}
        },{new:true})
    }

    // re find the data agar tidak penumpukan
    const getUser = await user.findById(res?.user.id)
    res.json(getUser)
})


// method add ratings 
const ratingProduct = asyncHandler(async(req,res)=>{
    const {idProd,stars,comment} = req.body
    const userInput = res?.user._id

    try { 
        const findProduct = await product.findById(idProd);
        const alreadyStared = findProduct?.ratings.find((userId) => userId.equals(userInput));
        if(alreadyStared){
            await product.findByIdAndUpdate(idProd,{
                ratings : { $elemMatch : alreadyStared },
                $set : {"ratings.$.star" : stars , "ratings.$.comment" : comment}},
                {new : true})
        }else{
            await product.findByIdAndUpdate(idProd,{
                $push : {ratings : {
                    star : stars,
                    comment : comment,
                    postedBy : userInput
                }}
            },{new : true})
        }
    
        const getRateAvg = await product.findById(idProd)
        let totalRate = getRateAvg.ratings.length
        let sumTotalRate = getRateAvg.ratings.map((item)=> item.star)
        .reduce((prev, curr)=> prev + curr , 0)
        let actualRating = Math.round(sumTotalRate/totalRate);
    
        const finalRating = await product.findByIdAndUpdate(idProd,{
            totalRating : actualRating
        },{
            new : true
        })
        res.json(finalRating)
    } catch (error) {
        throw new Error(error)
    }
})

const removeRating = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try {
        const data = product.findById(id)
        const similarId = data?.ratings?.postedBy?.find((user)=>{
            res.user.id.equals(user)
        })
        if(similarId){
            console.log("sama")
        }
        // res.json(similarId)
    } catch (error) {
        
    }

})

module.exports = {
    createProduct,getAllProducts,
    getProduct,updateProduct,
    deleteProduct,addWIshList,ratingProduct,
    removeRating
}    
