import {createUser, findUserByEmail, findUserByUsername} from '../models/userDetail.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

async function registerUser(req,res){
    const {username, email, password} = req.body;
    try{

        if(!username || !email || !password){
            return res.status(401).json({error:"username/email/password cannot be empty"});
        }

        const existingUserByUsername = await findUserByUsername(username);
        if(existingUserByUsername){
            return res.status(401).json({error:"username already exists"});
        }

        const existingUserByEmail = await findUserByEmail(email);
        if(existingUserByEmail){
            return res.status(401).json({error:"email already exists"});
        }

        const newUser = await createUser(username,email, password);

        res.status(201).json({
            username: newUser.username,
            email: newUser.email,
        });

    }
    catch(error){
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}

async function loginUser(req, res){
    const {username, password} = req.body;
    try{

        if(!username || !password){
            return res.status(401).json({error:"Username/password cannot be empty"});
        }

        const user = await findUserByUsername(username);
        if(!user){
            return res.status(401).json({error:"No user by that username"});
        }

        const passwordMatch = await bcrypt.compare(password,user.password);

        if(!passwordMatch){
            return res.status(401).json({error:"Wrong password"});
        }

        const token = jwt.sign({userName:user.username}, process.env.JWT_SECRET_KEY,{expiresIn:'24h'});
        res.json({ token });
    }
    catch(error){
        console.error("\nError logging in: ", error)
        res.status(500).json({ error: "Internal Server Error"});
    }
}

export {registerUser,loginUser};