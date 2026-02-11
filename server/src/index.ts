// src/index.ts
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { query } from './db';

// Load environment variables
dotenv.config();

// Create the app
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());           // Enable Cross-Origin Resource Sharing
app.use(express.json());   // Parse JSON bodies

// Routes
app.get( '/', async(req: Request, res: Response) => {
    try{
        const result = await query('SELECT NOW()');
        res.json({
        message: "Welcome to the Hextech Vault API",
        database_time: result.rows[0].now
        }) ;
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database connection failed' });
    }
});

//Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
