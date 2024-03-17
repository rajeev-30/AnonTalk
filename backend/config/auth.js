import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
    path:"../confing/.env"
})

export const isAuthenticated = async(req,res,next) =>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message: "User not logged in",
                status: false
            })
        }

        const decode = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(decode);
        req.user = decode.userId;
        next();

    } catch (error) {
        console.log(error);
    }
}
