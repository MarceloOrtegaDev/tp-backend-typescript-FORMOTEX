import dotenv from 'dotenv';
dotenv.config();

export const MONGO_DB_CONNECTION:string = process.env.MONGODB_CONNECTION_STRING