
import {Users, Admins} from "../backend/models/users.model.js";



export const adminLogin = async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    try {
        // Check if the admin exists
        const admin = await Admins.findOne({ username });
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }

        // Compare passwords (without bcrypt, use direct comparison)
        if (admin.password !== password) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        // Successful login
        res.status(200).json({ success: true, message: "Admin login successful", data: { username: admin.username, role: admin.role } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};




export const registerAdmin = async (req, res) => {
    const { username, password, role } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    try {
        // Check if the admin already exists
        const existingAdmin = await Admins.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ success: false, message: "Admin already exists" });
        }

        // Create new admin
        const newAdmin = new Admins({ username, password, role: role || "admin" });
        await newAdmin.save();

        res.status(201).json({ success: true, message: "Admin registered successfully", data: newAdmin });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};