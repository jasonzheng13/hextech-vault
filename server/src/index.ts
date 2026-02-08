// src/index.ts
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create the app
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());           // Enable Cross-Origin Resource Sharing
app.use(express.json());   // Parse JSON bodies

// Routes
app.get( '/', (req: Request, res: Response) => {
    res.json({
        message: "Welcome to the Hextech Vault API",
        status: "Online",
        timestamp: new Date()
    }) ;
});

//Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
