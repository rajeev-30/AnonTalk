import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import { Tweet } from "../models/tweetSchema.js";

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
            user,
            status: true
        })
    }catch(error){
        console.log(error);
    }
}

export const Logout = (req, res) =>{
    return res.cookie("token", "", {expiresIn: new Date(Date.now())}).json({
        message: "User logged out successfully",
        status: true  
    });
}  

export const bookmark = async(req, res) =>{
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const user = await User.findById(loggedInUserId);
        if(user.bookmarks.includes(tweetId)){ 
            //Remove bookmark
            await User.findByIdAndUpdate(loggedInUserId, {$pull: {bookmarks: tweetId}});
            return res.status(200).json({
                message: "Bookmark removed successfully",
            })
        }else{
            await User.findByIdAndUpdate(loggedInUserId, {$push: {bookmarks: tweetId}});
            return res.status(200).json({
                message: "Bookmarked successfully",
            })
        }

    } catch (error) {
        console.log(error);
    }
}

export const getMyProfile = async(req,res) =>{
    try {
        const id = req.params.id;
        const user =  await User.findById(id).select("-password");

        return res.status(200).json({
            user
        })
    } catch (error) {
        console.log(error);
    }
}
 
export const getOtherUsers = async(req,res) =>{
    try {
        const {id} = req.params;
        const otherUsers = await User.find({_id:{$ne:id}}).select("-password");
        if(!otherUsers){
            return res.status(401).json({
                message: "No other users found"
            })
        }
        return res.status(200).json({
            otherUsers
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const follow = async(req,res) => {
    try {
        const loggedInUserId = req.body.id;
        const userToFollowId = req.params.id;

        const loggedInUser = await User.findById(loggedInUserId);
        const userToFollow = await User.findById(userToFollowId);

        if(!userToFollow.followers.includes(loggedInUserId)){
            await userToFollow.updateOne({$push:{followers:loggedInUserId}});
            await loggedInUser.updateOne({$push:{following:userToFollowId}});
        }else{
            return res.status(200).json({
                message:`You are already following this ${userToFollow.username}`
            })
            // await userToFollow.updateOne({$pull:{followers:loggedInUser}});
            // await loggedInUser.updateOne({$pull:{following:userToFollow}});
        }
        return res.status(200).json({
            message:`${loggedInUser.username} follows ${userToFollow.username}`
        })
    } catch (error) {
        console.log(error);
        
    }

}

export const unfollow = async(req,res) => {
    try {
        const loggedInUserId = req.body.id;
        const userToFollowId = req.params.id;

        const loggedInUser = await User.findById(loggedInUserId);
        const userToFollow = await User.findById(userToFollowId);

        if(userToFollow.followers.includes(loggedInUserId)){
            await userToFollow.updateOne({$pull:{followers:loggedInUserId}});
            await loggedInUser.updateOne({$pull:{following:userToFollowId}});
        }else{
            return res.status(200).json({
                message:`You hasn't followed ${userToFollow.username} yet`
            })
        }
        return res.status(200).json({
            message:`${loggedInUser.username} unfollows ${userToFollow.username}`
        })
    } catch (error) {
        console.log(error);
        
    }

}