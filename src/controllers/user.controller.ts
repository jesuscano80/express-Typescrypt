import { NextFunction, Response, Request } from "express";
import bcrypt from "bcrypt"
import User from "../models/user.models"
import {v4} from "uuid"
import {mailOptions,transporter} from "../middlewares/nodemailer"

export const home=(req: Request, res: Response, next: NextFunction)=>{
    try {
        res.status(200).json({message:"success"})        
    } catch (error) {
        next(error);
    }
}

export const signin= async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {user, password}=req.body;
        if(!user || !password){
          return res.status(500).json({message:"User and password fields are mandatory"})
        }
        //Encrypt password
        const salt=await bcrypt.genSalt(10)
        const encryptPassword=await bcrypt.hash(password, salt)
        console.log(encryptPassword);
        const userObj={user, password:encryptPassword, valid:false}
        const newUser=new User(userObj);
        const userCreated= await User.create(newUser)
        res.status(200).json({message:"User Created " + userCreated})
        
    } catch (error) {
        next(error);
    }
} 

export const login= async (req: Request, res: Response, next: NextFunction)=>{
  
    try {
        
        const {email, password}=req.body;
          const userFound= await User.findOne({user})
          if(!userFound){
           return res.status(500).json({message:"Error user or password invalid"})
          }
          else{
            if(userFound.password){
            const passwordCorrect=await bcrypt.compare(password, userFound.password)
            console.log(userFound);
            if(passwordCorrect){
                res.status(200).json({message: userFound})
            }
            else{
                res.status(500).json({message:"Error user or password invalid"})
            }
            }
          }
          
    } catch (error) {
        next(error);
    }
}


export const deleteUser= async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id}=req.body;
        const deleteuser= await User.deleteOne({_id:id})
        res.status(200).json(deleteuser)
    } catch (error) {
        next(error)
    }
} 

export const getAllUsers= async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const allusers= await User.find({})
        res.status(200).json(allusers)
    } catch (error) {
        next(error)
    }
}

export const sendPassword= async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {email}=req.body;
        const userFound= await User.findOne({email})
        if(userFound){
          userFound.passwordResetId=v4()
          const userChanged=await User.findByIdAndUpdate(userFound._id, {passwordResetId: userFound.passwordResetId},{upsert:true} )
          if(userFound.email){
          mailOptions.to=userFound.email
          mailOptions.html= `<body>
          <p>Click to set a new password : <a href="http://localhost:3001/password/reset/:${userChanged?.email}/:${userChanged?.passwordResetId}">Reset password</a></p>
          </body>`
        
          transporter.sendMail(mailOptions,
            (err, info) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Email sent: ${info.response}`);
                }
            })
            }
        }
        else{
            res.status(500).json({message: "email not found"})
        }

        res.status(200).json(userFound)
    } catch (error) {
        next(error)
    }
}

export const resetPassword=async (req: Request, res: Response, next: NextFunction)=>{
    try {
        
    } catch (error) {
    next(error);       
    }
}