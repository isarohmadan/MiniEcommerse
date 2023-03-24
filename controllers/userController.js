const userModels = require('../models/userModels');
const {generateToken} = require('./../config/jwtToken')
const asyncHandler = require('express-async-handler')
const {validateMongoDbId} = require('./../utils/validateMongodbid')
const {refreshToken} = require('./../config/refreshToken');
const jwt = require('jsonwebtoken')
const createUser = asyncHandler(async (req,res)=>{
    const email = req.body.email;
    const findUser = await userModels.findOne({email:email});
    if(!findUser){
        const newUser = await userModels.create(req.body)
        res.json(newUser)
    }else{
        throw new Error("User already exist")
    }
})

const loginUserCtrl = asyncHandler(async (req,res)=>{
    const { email,password} = req.body;
    // check if user exist 
    // find the id based by email
    const findUser = await userModels.findOne({ email })
    if(findUser && (await findUser.isPasswordMatched(password))){
        const generateRefreshToken = await refreshToken(findUser?.id)
        const updateUserToken = await userModels.findByIdAndUpdate(findUser?.id,
                {
                    refreshToken : generateRefreshToken
                },
                {
                    new : true
                }
            )
        res.cookie('refreshToken',generateRefreshToken, { maxAge: 72 * 60 * 60 * 1000, httpOnly: true });
        res.json({
            _id: findUser?._id,
            name: findUser?.name,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
            Role: findUser?.Role,
            token : generateToken(findUser?._id)
        })
        
    }else{
        throw new Error("invailid Credentials")
    }
})

const handleRefreshToken = asyncHandler(async(req,res)=>{
   const cookie = req.cookies;
   if(!cookie?.refreshToken) throw new Error(" no refresh Token")
   const tokenRefresh = cookie.refreshToken
   const user = await userModels.findOne({refreshToken: tokenRefresh})
   if(!user) throw new Error("cant find the token")

   jwt.verify(tokenRefresh, process.env.JWT_SECRET_TOKEN , (err,decoded)=>{
       if(err || user.id !== decoded.id) {
           throw new Error ("something wrong with cookies")
        }
       const accessToken = generateToken(user?._id)
       res.json({accessToken})
   })
   
})

// get All users
const getAllUsers = asyncHandler(async (req,res)=>{
    try {
        // finding all the data 
        const getUsers = await userModels.find()
        res.json(getUsers)
    } catch (error) {
        throw new Error(error)
    }
})

const logout = asyncHandler(async (req,res)=>{
    const cookie = req.cookies;
    if(!cookie?.refreshToken) throw new Error("There is no Refresh cookie")
    const refreshToken = cookie.refreshToken
    const user = await userModels.findOne({refreshToken: refreshToken})
    if(!user){
        res.clearCookie('refreshToken',{
            httpOnly : true,
            secure : true
        })
        return res.sendStatus(204); //forbiden
    }
    const tetsi = await userModels.findOneAndUpdate({refreshToken: refreshToken},{refreshToken: ""})
    res.clearCookie('refreshToken',{
        httpOnly : true,
        secure : true
    })
    return res.sendStatus(204); //forbiden
})

// get Single User
const getSingleUser = asyncHandler(async (req,res)=>{
    const{id} = req.params;
    validateMongoDbId(id)
    try {
        // dont use {} because it will be error id do not able to accpt object id
        const getUser = await userModels.findById(id)
        res.json(getUser)
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
})

// update a user

const updateUser = asyncHandler(async (req,res)=>{
    const {id} = res.user;
    // validateMongoDbId(id)
    console.log(id)
    try {
        // pertama yaitu mencari id nya kalo sudah sama baru bisa manipulasi yang lainnya 
        // atau bisa di bilang id sebagai patokannya
        const updateUser = await userModels.findByIdAndUpdate(id ,{
            name : req?.body?.name,
            email : req?.body?.email,
            mobile : req?.body?.mobile,
        },{
            new : true
        })
        res.json(updateUser)
    } catch (error) {
        throw new Error(error)
        
    }
})
// block user by id
const blockUser = asyncHandler( async (req,res)=>{
 const {id} = res.user;
 validateMongoDbId(id)
 try {
     const blockUsr = await userModels.findByIdAndUpdate(
         id,
         {
             isBlocked : true
         },
         {
             new : true
         }
     )
     res.json({
         msg : "User is blocked"
     })
 } catch (error) {
     throw new Error(error)
 }
})

// unblock user by id
const unblockUser = asyncHandler( async(req,res)=>{
const {id} = res.user;
validateMongoDbId(id)
    try {
        const blockUsr = await userModels.findByIdAndUpdate(
            id,
            {
                isBlocked : true
            },
            {
                new : true
            }
        )
        res.json({
            msg : "User is unblocked"
        })
    } catch (error) {
        throw new Error(error)
    }
})

// delete user based id 
const deleteUserById = asyncHandler(async (req,res)=>{
    const{id} = req.params;
    validateMongoDbId(id)
    try {
        // dont use {} because it will be error id do not able to accpt object id
        const deleteUserById = await userModels.findByIdAndDelete(id)
        res.json(deleteUserById)
    } catch (error) {
        throw new Error(error)
    }
})
module.exports = {createUser , loginUserCtrl,handleRefreshToken, getAllUsers ,logout, getSingleUser ,updateUser ,blockUser,unblockUser,  deleteUserById}