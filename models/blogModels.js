const mongoose = require('mongoose')

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    }
    ,
    description:{
        type:String,
        required:true,
    },
    like:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    dislike:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    isLiked : {
        type:Boolean,
        default : false
    },
    isDisliked : {
        type : Boolean,
        default : false,
    },
    numLikes:{
        type:Number,
        default:0
    },
    numViews:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        ref:"Category",
        required:true,
    },
    image : {
        type :String,
        default : "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Borobudur_Temple.jpg/320px-Borobudur_Temple.jpg"
    },
    author : { 
        type : String,
        default : "Admin"
    },

},
{
    toJson:{ 
        virtuals : true
    },
    toObjects:{
        virtuals : true
    },
    timestamps:true
});

//Export the    
module.exports = mongoose.model('blog', userSchema);