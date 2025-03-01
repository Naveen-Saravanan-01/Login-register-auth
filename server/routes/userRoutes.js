import express from "express";
import user from "../models/userModels.js";
import dotenv from "dotenv"
import jwt from "jsonwebtoken";
import authMiddleware from '../middleware/authMiddleware.js'
import bcrypt from "bcryptjs";

dotenv.config();


const router = express.Router();

router.post('/register',async(req,res)=>{

try{

    const {name,email,password} = req.body;

    const isExistUser= await user.findOne({email});
    if(isExistUser){
        return res.status(400).json({success:false,message:"User already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({name,email,password:hashedPassword})

    await newUser.save();

    res.status(201).json({success:true,message:"User Registered Successfully"});



}catch(err){
    res.status(500).json({message:"Error registering User"})
}

})


router.post('/login',async(req,res)=>{

    try{

    const {email,password}=req.body;

    const findUser = await user.findOne({email});

    if(!findUser){

        return res.json({success:false , message : "User Not found"})

    }

    const verifyPass=await bcrypt.compare(password,findUser.password);

    if(!verifyPass){
        return res.json({success:false,message:'Invalid Password'})
    }

    const token = jwt.sign({id:findUser._id},process.env.SECRET,{expiresIn:"1h"});



    return res.json({success:true , message : "Login successful",token})

}catch(err){

    res.json({success:false , message :err.message})

}

}


)

//protected route

router.get("/profile", authMiddleware, async (req, res) => {

    const users = await user.findById(req.user.id).select("-password")


    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Welcome to your profile", users});
});


//admin

// Admin route to get all users
router.get("/admin/users", authMiddleware, async (req, res) => {
    try {
      const users = await user.find().select("-password"); 
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving users" });
    }
  });
  


router.put("/update-user/:id", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const userId = req.params.id;
  
      console.log("Incoming update request for user:", userId);
      console.log("Request Body:", req.body);
  
      if (!userId) {
        console.log("User ID is missing");
        return res.status(400).json({ message: "User ID is required" });
      }
  
      // Check if user exists
      const existingUser = await user.findById(userId);
      if (!existingUser) {
        console.log("User not found:", userId);
        return res.status(404).json({ message: "User not found" });
      }
  
      // Filter out empty fields
      let updateFields = {};
      if (name) updateFields.name = name;
      if (email) updateFields.email = email;
      if (password) updateFields.password = await bcrypt.hash(password, 10);
  
    //   console.log("Updating user:", userId);
    //   console.log("Update fields:", updateFields);
  
      // Perform update
      const updatedUser = await user.findByIdAndUpdate(userId, updateFields, { new: true });
  
      if (!updatedUser) {
        console.log("Failed to update user:", userId);
        return res.status(500).json({ message: "Failed to update user" });
      }
  
    //   console.log("User updated successfully:", updatedUser);
      res.status(200).json({ message: "User updated successfully", updatedUser });
  
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  });
  
  

export default router;


