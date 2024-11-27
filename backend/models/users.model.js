import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ 
    gameID: { type: String, required: true },
    age: { type: String, required: true },
},{
    timestamps: true,
});


const Users = mongoose.model("Users", userSchema);

export default Users;