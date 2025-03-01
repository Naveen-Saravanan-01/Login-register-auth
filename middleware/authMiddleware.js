import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const authMiddleware = (req,res,next) =>{
    const token = req.header("Authorization")

    if(!token){
        return res.json({success:false, message:"Access denied,no token"})
    }

    try{
        const decoded = jwt.verify(token.split(" ")[1],process.env.SECRET);
        req.user=decoded;
        next();
    }catch(err){
        res.json({success:false, message:"Access denied,no token"})
    }
}

export default authMiddleware;