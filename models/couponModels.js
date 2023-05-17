const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var couponSchema = new mongoose.Schema({
    name:{
        type:String,
        uppercase : true,
        required:true,
    },
    expired:{
        type:Date,
        required:true,
    },
    discount:{
        type:Number,
        required:true,
        max:100
    }
});

//Export the model
module.exports = mongoose.model('Coupon', couponSchema);