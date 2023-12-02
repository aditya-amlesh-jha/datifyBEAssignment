import express from "express";
import dotenv from "dotenv";
import { connectToDb, disconnectFromDb } from "./models/db.js";
import authRoutes from './router/authRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectToDb();

app.use(express.json())
app.use("/auth",authRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port :: ${PORT}`)
});

process.on("exit",()=>{
    disconnectFromDb();
})