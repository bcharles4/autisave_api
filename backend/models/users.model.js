import mongoose from "mongoose";

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
export default Users;
