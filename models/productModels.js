const mongoose = require('mongoose')

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    slug:{
        type:String,
        required : true,
        unique: true,
        lowercase:true
    }
    ,
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    quantities:{
        type:Number,
        default:0
    },
    sold:{
        type:Number,
        default:0
    },
    ratings:[{
        star : Number,
        comment : String,
        postedBy : {type:mongoose.Schema.Types.ObjectId, reff:"User"}

    }
    ]
    ,
    color:{
        type:String,
        required : true,
    },
    category:{
        type:String,
        ref:"Category",
        required:true,
    }

},
{
    timestamps:true
});

//Export the    
module.exports = mongoose.model('Product', userSchema);