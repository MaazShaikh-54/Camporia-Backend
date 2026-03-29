import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const authRoutes = express.Router();

authRoutes.post('/register', async (req, res) => {
    try {
        const { name , email, password } = req.body;

        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message: "Email already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({message: "User registered successfully"});

    }catch (error) {
        console.error("Registration error: ", error);
        res.status(500).json({message: error.message});
    }
});

authRoutes.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: "Invalid Credentials"});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: "Invalid Credentials"});

        const token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

        res.json({ token, userId: user._id, name: user.name });

    }catch(error) {
        console.error("Login error: ", error);
        res.status(500).json({error: error.message});
    }
});

export default authRoutes;