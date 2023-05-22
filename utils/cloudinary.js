const cloudinary = require('cloudinary')

// Configuration 
cloudinary.config({
    cloud_name: "<--- name cloud cloudinary ----->",
    api_key: "<-------- api key of cloudinary ----->",
    api_secret: "<------ api secret cloudinary ---->"
});


const cloudinaryUploadImg = async(fileToUploads) =>{
    return new Promise((resolve)=>{
        cloudinary.uploader.upload(fileToUploads,(result)=>{
            resolve({
                url : result.secure_url,
            }),{
                resource_type : "auto"
            }
        })
    })
}

module.exports = cloudinaryUploadImg
