import mongoose, { Document } from "mongoose"
import { IUser } from "../interfaces/user.interface"

const userSchema = new mongoose.Schema<IUser> ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    Role: {
        default: "user",
        type: String,
        required: false
    }
})

export const userModel = mongoose.model<IUser>("User", userSchema)