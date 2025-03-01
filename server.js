import express, {  } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv" ;
import router from "./routes/userRoutes.js";

dotenv.config()

const app = express();
const port =process.env.PORT || 4000

app.use(express.json());
app.use(cors())

app.get('/',(req,res)=>{res.send("API working")})

//routes
app.use("/api/users",router)

mongoose.connect(process.env.MONGO_URL).then(()=>    console.log("Database connected")
).catch((err)=>
    console.log(err)
)

app.listen(port,()=>{console.log(`server started on ${port}`)})


