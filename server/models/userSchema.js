const mongoose= require('mongoose')

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    imagePath: {
        type: String,
        default: ''
    }    
})

module.exports=mongoose.model('users',userSchema)