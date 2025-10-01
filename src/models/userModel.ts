import { Schema, model } from "mongoose"
import mongoose from "mongoose"

const userSchema = new mongoose.Schema ({
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
        type: String,
        required: false
    }
})

export const userModel = mongoose.model("User", userSchema)