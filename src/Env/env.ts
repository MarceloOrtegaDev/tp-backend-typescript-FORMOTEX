import dotenv from 'dotenv';
dotenv.config();

export const MONGO_DB_CONNECTION:string = process.env.MONGODB_CONNECTION_STRING
export const JWT_SECRET:string = process.env.JWT_SECRET