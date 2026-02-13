import {Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import {query } from '../db';

// register user logic
export const register = async (req: Request, res: Response) => { 
    try{// 1. destructure the input, checks if user already exists
        const { username, password } = req.body;

        // 2. hash the password
        // 10 is the salt rounds, aka how expensive the calculation is
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //3. insert into database
        // $1 and $2 are placeholders for security( prevents SQL injection)
        const newUser = await query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, created_at',
            [username, hashedPassword]
        );

        // 4. send response
        res.status(201).json({
            message: "User registration successful",
            user: newUser.rows[0]
        })  
    }catch (err: any){
        console.error(err);
        if (err.code == '23505'){
            res.status(400).json({ error: "Username already exists" });
        }else{
            res.status(500).json({ error: "Server error" });
        }
    }
};