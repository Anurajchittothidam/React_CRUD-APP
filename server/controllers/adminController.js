const user=require('../models/userSchema')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const { configDotenv } = require('dotenv')
configDotenv()

const adminControllers={
     Login:(req,res)=>{
        try{
            const{email,password}=req.body
            if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASS){
                const token=jwt.sign({id:email},process.env.JWT_SCR)
                res.status(200).json({token,admin:email})
            }else{
               return res.status(400).json("Invalid credentials! Try again")
            }
        }catch(err){
          console.log(err);
           return res.status(500).json({error:err.message})
        }
    },
    
    
    
   getAllUsers:async(req,res)=>{
        try{
            const getAllUsers=await user.find()
            if(!getAllUsers){
               return res.status(400).json({error:'No users found'})
            }else{
                return res.status(200).json({getAllUsers})
            }
    
        }catch(err){
            console.log(err)
            res.status(500).json({error:err.message})
        }
    },
    
    
    editUser:async(req,res)=>{
        try{
            const id=req.params.id
            const {username,phonenumber,email}=req.body
            const emailExist=await user.findOne({email},{_id:1})
            if(!emailExist){
                user.findOneAndUpdate({_id:id},{$set:{userName:username,phoneNumber:phonenumber,email:email}}).then((updatedUser)=>{
                return res.status(200).json({userEdited:updatedUser})
                })
            }else{
                let Id=emailExist['_id']
                const emailId=Id.toString()
                if(emailId===id){
                    user.findOneAndUpdate({_id:id},{$set:{userName:username,phoneNumber:phonenumber,email:email}}).then((updatedUser)=>{
                        return res.status(200).json({userEdited:updatedUser})
                    })
                }
              else{
                return res.status(400).json('Sorry this Email alredy taken')
              }
            }
        }catch(err){
            console.log(err)
        }
    }
    ,
   addUser:async(req,res)=>{
        try{
            const {username,email,password,phonenumber}=req.body
            const emailExist=await user.findOne({email:email})
            if(emailExist){
                return res.status(500).json('This email alredy exists')
            }else{
               const hash=await bcrypt.hash(password,10)
               const newUser=new user({
                userName:username,
                email:email,
                phoneNumber:phonenumber,
                password:hash
               })
               newUser.save().then((user)=>{
                return res.status(200).json(user)
               })
            }
        }catch(err){
            res.status(500).json({error:err.message})
        }
    }
    ,
    
    deleteUser:async(req,res)=>{
        try{
            const id=req.params.id
            await user.deleteOne({_id:id})
            res.status(200).json({})
        }catch(err){
            res.status(500).json('something went wrong')
        }
    },

    getUser:async(req,res)=>{
        try{
            const id=req.params.id
            console.log('id',req.params.id)
            const userData=await user.findOne({_id:id})
            console.log(userData)
            if(!userData){
                res.status(400).json('No user found')
            }else{
                // const {email,phoneNumber,userName,id}=userData
                res.status(200).json({userData})
            }
        }catch(err){
            res.status(500).json({error:err.message})
        }
    }
    
}

module.exports=adminControllers