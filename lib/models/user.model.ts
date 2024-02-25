"use server"

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id:{type: 'string', required: true},
    username:{type: 'string', required: true, unique: true},
    name:{type: 'string', required: true},
    image: String, 
    bio: String,
    threads:[
        {
            type: mongoose.Schema.Types.ObjectId,
            red:'Thread'
        }
    ],
    onboarded: {
        type:Boolean,
        default: false,
    },
    communities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Community'
        }
    ]
})

export const User = mongoose.models.User || mongoose.model('User', userSchema);