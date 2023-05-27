
const validator  = require('../helpers/validate')
const { genSaltSync,hashSync,compareSync }  = require('bcrypt')
const { sign }  =  require('jsonwebtoken')
const db = require('../models/index')
const User = db.user;

const createUser = (req,res)=>{
    let jsonData = req.body;
    console.log("body",jsonData)
    let validationRule = {
        name : 'required',
        email: 'required',
        password: 'required'
    } 
    validator(jsonData,validationRule,{},async (err,status)=>{
        if(!status){
            return res.status(400).json({status:false,message:err.errors,error: err.errors})
        }
        else{
            let getUser = await User.findOne({
                where:{
                    email : jsonData.email
                }
            })
            if(getUser==null){
                const salt = genSaltSync(10);
                jsonData.password = hashSync(jsonData.password,salt)
                let createObject  = {name:jsonData.name,email:jsonData.email,password:jsonData.password} 
                let createduser = await User.create(createObject)
                return res.status(200).json({status:true,message:'user created',error: '',data: createduser })
            }
            else{
                return res.status(400).json({status:false,message:'this email already exist ',error: 'this email already exist'})
            }
        }
    })
}
const login = (req,res)=>{
    let jsonData = req.body;
    console.log("body",jsonData)
    let validationRule = {
        email: 'required',
        password: 'required'
    } 
    validator(jsonData,validationRule,{},async (err,status)=>{
        if(!status){
            return res.status(400).json({status:false,message:err.errors,error: err.errors})
        }
        else{
            let getUser = await User.findOne({
                where:{
                    email : jsonData.email
                }
            })
            if(getUser==null){
                return res.status(400).json({status:false,message:'user not register ',error: 'user not register'})
            }
            else{
                const isMatched = compareSync(jsonData.password,getUser.password)
                if(isMatched){
                    const jsonwebtoken = sign({result:getUser},process.env.SECRET_KEY,{expiresIn:process.env.TOKEN_EXPIRY})
                    return res.status(200).json({status:true,message:'login sucess',error: '',data: getUser,token: jsonwebtoken })
                }
                else{
                    return res.status(400).json({status:false,message:'Invalid password',error: 'Invalid password'})
                }
                
            }
        }
    })
}
module.exports = {
    createUser,  login
}