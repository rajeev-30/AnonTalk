import { Tweet } from "../models/tweetSchema.js";
import { User } from "../models/userSchema.js";
import { getOtherUsers } from "./userController.js";

export const createTweet = async(req, res) =>{
    try {
        const {description, id} = req.body;
        if (!description || !id){
            return res.status(404).send({
                message: "Please enter a description",
                status: false
            })
        }; 
        await Tweet.create({
            description,
            userId: id
        });
 
        return res.status(201).json({
            message: "Tweet created successfully",
            status:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const deleteTweet = async(req, res) => {
    try {
        const {id}  = req.params;
        await Tweet.findByIdAndDelete(id);
        return res.status(201).json({
            message: "Tweet deleted successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}  

export const likeOrDislike = async(req,res) =>{
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id; 
        const tweet = await Tweet.findById(tweetId);
        if(tweet.like.includes(loggedInUserId)){
            // Dislike 
            await Tweet.findByIdAndUpdate(tweetId, {$pull:{like:loggedInUserId}});
            return res.status(200).json({
                message:"User disliked your tweet",
            })
        }else{
            // Like 
            await Tweet.findByIdAndUpdate(tweetId, {$push:{like:loggedInUserId}});
            return res.status(200).json({
                message: "User liked you tweet",
            })
        }
    } catch (error) {
        console.log(error);
    }
} 

// export const getAllTweets = async(req,res) =>{
//     try {
//         //LoggedInUser tweets + All other users tweets
//         const id = req.params.id;
//         const loggedInUser = await User.findById(id); 
//         const loggedInUserTweets = await Tweet.find({userId:id})
//         const followingUserTweets = await Promise.all(loggedInUser.following.map((otherUsers)=>{
//             return Tweet.find({userId:otherUsers});
//         }));
//         return res.status(200).json({
//             tweets: loggedInUserTweets.concat(...followingUserTweets),
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

export const getAllTweets = async(req,res) =>{
    try {
        //LoggedInUser tweets + All other users tweets
        const id = req.params.id;
        const tweets = await Tweet.find({_id:{$ne:id}});
        return res.status(200).json({
            tweets
        })
    } catch (error) {
        console.log(error);
    }
}

export const getFollowingTweets = async(req,res) =>{
    try {
        //following users tweets
        const id = req.params.id;
        const loggedInUser = await User.findById(id); 
        const followingUserTweets = await Promise.all(loggedInUser.following.map((otherUsers)=>{
            return Tweet.find({userId:otherUsers});
        }));
        return res.status(200).json({
            tweets: [].concat(...followingUserTweets),
        })
    } catch (error) {
        console.log(error);
    }
}
