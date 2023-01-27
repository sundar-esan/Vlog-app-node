import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import vlogRouter from "./routes/vlog-routes.js";
import cors from "cors";
import dotenv from "dotenv";



dotenv.config();

console.log(process.env.MONGO_URL);

const app = express();

const PORT = process.env.PORT


app.use(cors());

app.use(express.json());

app.use("/api/user", router); 

app.use("/api/vlog", vlogRouter);

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
.then(()=>app.listen(PORT))
.then(()=>console.log("Database connected🤞 & listing localhost 5000")).catch((err)=>console.log(err));



