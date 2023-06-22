const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const mongoose=require('mongoose')
const {upload}=require('../middleware/uploadImage')
const { configDotenv } = require('dotenv')

configDotenv()

const users=require('../models/userSchema')

const userController={ 
    signUp:async(req,res)=>{
    try{
        const {username,email,password,phonenumber}=req.body
        if (!username || !email || !password) {
            return res.status(400).json('Please provide all required fields');
        }
        const emailExist=await users.findOne({email})

        if(!emailExist){
            const hash=await bcrypt.hash(password,10)
           const newUser=new users({
            userName:username,
            email:email,
            phoneNumber:phonenumber,
            password:hash
           })
           newUser.save().then((user)=>{
            return res.status(200).json(user)
           }).catch((err)=>{
             return res.status(400).json(err.message)
           })
        }else{
            return res.status(400).json(`This email alredy exists`) 
        }
    }catch(err){
        res.status(500).json(err.message)
    }
},

login:async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await users.findOne({email:email})
        if(!user){
            return res.status(400).json('This email not exist')
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
           return res.status(400).json('This password not match')
        }else{
            const token=await jwt.sign({_id:user._id},process.env.JWT_SCR)
           return res.status(200).json({user,token,id:user._id})
        }
    }catch(err){
        res.status(500).json({error:err.message})
    }
},

getUser:async(req,res)=>{
    try{
        const id=new mongoose.Types.ObjectId(req.body)
        const userData=await users.findOne({_id:id})
        if(!userData){
          return res.status(500).json('User not found')
        }else{
            const {email,phoneNumber,userName,id}=userData
            res.status(200).json({email,userName,phoneNumber,id})
        }  
    }catch(err){
        return res.status(500).json(err.message)
    }
},

editUser:async(req,res)=>{
    try{
        const {username,phonenumber,email,id}=req.body
        const emailExist=await users.findOne({email:email},{_id:1})
        console.log('emialExist',emailExist)
            if(!emailExist){
                users.findOneAndUpdate({_id:id},{$set:{userName:username,phoneNumber:phonenumber,email:email}}).then((updatedUser)=>{
                    return res.status(200).json({updatedUser})
                })
            }else {
                const emailId = emailExist['_id'];
                const Id=emailId.toString()
                if(Id===id){
                    console.log('id is same')
                    users.findOneAndUpdate({_id:id},{$set:{userName:username,phoneNumber:phonenumber,email:email}}).then((updatedUser)=>{
                        return res.status(200).json({updatedUser})
                    })
                }else{
                    return res.status(400).json(`this email is alredy taken`)
                }
            }
    }catch(err){
        return res.status(500).json(err.message)
    }
},

uploadImage:async(req,res)=>{
    try{
        const {id,image}=req.body
        // const image=req.file.filename
        console.log(id,image)
        await users.findOneAndUpdate({_id:id},{$set:{imagePath:image}}).then((result)=>{
            res.status(200).json({result})
        }).catch((err)=>{
            res.status(400).json({error:err.message})
        })
    }catch(err){
        return res.status(500).json({error:err.message})
    }
}
}

module.exports=userController;