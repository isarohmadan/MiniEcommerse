const Blog = require('./../models/blogModels')
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
const showBlog = asyncHandler(async(req,res) =>{ 
    try { 
        const dataBlog = await Blog.find()
        .populate({
            path : "like",
            select : "name email mobile _id"
        })
        .populate({
            path : "dislike",
            select : "name email mobile _id"
        })
        res.json(dataBlog)
    }catch{
        throw new Error(error)
    }
})
const findBlog = asyncHandler(async(req,res) => {
    const {id} = req.params
    try {
        const blog = await Blog.findById(id) 
        const incView = await Blog.findByIdAndUpdate(id,
            {
                $inc : {numViews : 1}
            },
            {
                new : true
            })
        res.json(incView)
    } catch (error) {
        throw new Error("error! couldn't find the id")
    }
})

const editBlog = asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongoId.validateMongoDbId(id); 
    try {
        const updateBlog = await Blog.findByIdAndUpdate(id,
                req?.body,
            {
                timestamps : true
            }
            )
        const findUserUpdated = await Blog.findById(id)
        res.json(findUserUpdated)

    } catch (error) {
        throw new Error(error)
    }

})

const removeBlog= asyncHandler(async(req,res)=>{
    const{id} = req.params
    validateMongoId.validateMongoDbId(id); 
    try {
        const removeBlog = await Blog.findByIdAndRemove(id)
        res.json("success remove the data")
    } catch (error) {
        throw new Error(error)
    }
})

// ----------------- like the blog

const liketheBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoId.validateMongoDbId(blogId);
    // cari blog
    const blog = await Blog.findById(blogId);
    // user login nya 
    const loginUserId = res?.user?._id;
    // fapakah sudah like
    const isLiked = blog?.isLiked;
    // apakah user dislike 
    const alreadyDisliked = blog?.dislike?.find(
      (userId) =>  userId.equals(loginUserId)
    );
    if (alreadyDisliked) {
        await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislike: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
    }
    if (isLiked) {
        await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { like: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      
    } else {
        await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { like: loginUserId },
          isLiked: true,
        },
        { new: true }
      );
    }


    const updatedBlog = await Blog.findById(blogId);
    res.json(updatedBlog);
  });


// -----------------------------------------------------
  const dislikeTheBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoId.validateMongoDbId(blogId);
    // cari blog
    const blog = await Blog.findById(blogId);
    // user login nya 
    const loginUserId = res?.user?._id;
    // fapakah sudah like
    const isDisliked = blog?.isDisliked;
    // apakah user dislike 
    const alreadyLiked = blog?.like?.find(
      (userId) => userId.equals(loginUserId)
    );
    if (alreadyLiked) {
        await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { like: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
    }
    if (isDisliked) {
        await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislike: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      
    } else {
        await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { dislike: loginUserId },
          isDisliked: true,
        },
        { new: true }
      );
    }


    const updatedBlog = await Blog.findById(blogId);
    res.json(updatedBlog);
  });


module.exports = {
    createBlog,
    showBlog,
    findBlog,
    editBlog,
    removeBlog,
    liketheBlog,
    dislikeTheBlog
}