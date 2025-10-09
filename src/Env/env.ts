import dotenv from 'dotenv';
dotenv.config();

export const MONGO_DB_CONNECTION = process.env.MONGODB_CONNECTION_STRING!
export const JWT_SECRET = process.env.JWT_SECRET!