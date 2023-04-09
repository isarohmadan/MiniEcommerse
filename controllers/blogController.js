const Blog = require('./../models/blogModels')
const User =  require('./../models/userModels')
const asyncHandler = require('express-async-handler')
const validateMongoId = require('./../utils/validateMongodbid')


const createBlog = asyncHandler(async(req,res) => {
    try {
        const newBlog = await Blog.create(req.body)
        res.json(newBlog)
    } catch (error) {
        throw new Error(error)
    }
})


module.exports = {
    createBlog
}