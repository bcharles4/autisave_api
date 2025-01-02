import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema(
    { 
        gameID: { type: String, required: true, unique: true }, // Ensure gameID is unique
        age: { type: String, required: true },
        score: { type: Number, default: 0 }, // Track the user's cumulative score
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

const Users = mongoose.model("Users", userSchema);

// Admin Schema
const adminSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: "admin" } // Role can be extended for more granularity
    },
    {
        timestamps: true,
    }
);

const Admins = mongoose.model("Admins", adminSchema);

export { Users, Admins };
