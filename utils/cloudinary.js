const cloudinary = require('cloudinary')

// Configuration 
cloudinary.config({
    cloud_name: "dofivq9xy",
    api_key: "826849717236337",
    api_secret: "XHW8M24Otz_kude2MmZdNxZ7RFY"
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
