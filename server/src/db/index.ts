import {Pool} from 'pg';
import dotenv from 'dotenv';
import { text } from 'node:stream/consumers';

dotenv.config();

const pool = new Pool({connectionString: process.env.DATABASE_URL,});

export const query = (text: string, params?: any[]) => pool.query(text, params);
