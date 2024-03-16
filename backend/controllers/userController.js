import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

export const Register = async(req,res) =>{
    try{
        const {name, username, email, password} = req.body;
        //Basic validation
        if(!name || !username || !email || !password) {
            return res.status(401).json({
                message: "All fields are required",
                success: false,
            })
        }
        const user = await User.findOne({username});

        if(user) {
            return res.status(401).json({
                message: "User already exists",
                success: false,
            })
        }
        const hashedPassword = await bcryptjs.hash(password, 16);
        await User.create({
            name, username, email, password:hashedPassword
        });

        return res.status(201).json({
            message:"Account created successfully",
            status:true
        })
    }catch(e){
        console.log(e);
    }
}

export const Login = async(req,res) =>{
    try{
        const  {username, password} = req.body;
        if(!username || !password) {
            return res.status(401).json({
                message: "Username or Password is missing",
                status:false
            })
        }

        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({
                message: "User doesn't exist",
                status:false
            })
        }

        const isPassMatch = await bcryptjs.compare(password, user.password);

        if(!isPassMatch){
            return res.status(201).json({
                message: "Invalid Credentials",
                status: false
            })
        }

        const tokenData = {
            userId:user._id,
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn:"1d"})

        return res.status(201).cookie("token", token, {expiresIn:"1d", httpOnly:true}).json({
            message: `Welcome back ${user.username}!`,
            status: true
        })
    }catch{
        console.log(error);
    }
}

export const Logout = (req, res) =>{
    return res.cookie("token", "", {expiresIn: new Date(Date.now())}).json({
        message: "User logged out successfully",
        status: true  
    });
}