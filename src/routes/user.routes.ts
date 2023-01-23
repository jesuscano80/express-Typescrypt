import { NextFunction, Router, Response, Request } from "express";
import bcrypt from "bcrypt"
import * as userCtrl from "../controllers/user.controller"
import User from "../models/user.models"

const router=Router();
router.get("/", userCtrl.home)

router.get("/getallusers", async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const allusers= await User.find({})
        res.status(200).json(allusers)
    } catch (error) {
        next(error)
    }
}
)

router.delete("/deleteuser",async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id}=req.body;
        const deleteuser= await User.deleteOne({_id:id})
        res.status(200).json(deleteuser)
    } catch (error) {
        next(error)
    }
} )
router.post("/login", async (req: Request, res: Response, next: NextFunction)=>{
  
    try {
        
        const {user, password}=req.body;
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
} )

router.post("/signin", async (req: Request, res: Response, next: NextFunction)=>{
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
} )


export default router;