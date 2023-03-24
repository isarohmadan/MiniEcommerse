const User = require('./../models/userModels')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const authMiddleware = asyncHandler(async (req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
        try {
            if(token){
                const decoded = jwt.verify(token,process.env.JWT_SECRET_TOKEN);
                const user = await User.findById(decoded?.id);
                res.user = user
                next()
            }
        }catch(error){
            throw new Error("Not Authorized token expired, please login again")
        }
    }else{
        throw new Error("there is no token attached to header")
    }
})

// is it admin?

const isAdmin = asyncHandler(async (req,res,next)=>{
    const {email} = res.user;
    const adminUser = await User.findOne({email})
    if(adminUser.Role !== "admin"){
        throw new Error ("you are not the admin");
    }else{
        next()
    }
})

module.exports = {authMiddleware,isAdmin}