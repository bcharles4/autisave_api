import express from "express";
import { 
    userCredentials, 
    getUsers, 
    deleteUser, 
    loginUser, 
    updateUserScore 
} from "../controller/users.controller.js"; // Ensure the file extension is correct
import { adminLogin, registerAdmin } from "../controller/admin.controller.js"; // Import the new registerAdmin controller

const router = express.Router();

// User routes
router.get("/", getUsers);                       // Get all users
router.post("/login", loginUser);                // User login
router.post("/newUser", userCredentials);        // Add new user
router.delete("/:id", deleteUser);               // Delete user by ID
router.post("/update-score", updateUserScore);   // Update user score

// Admin routes
router.post("/admin/login", adminLogin);         // Admin login route
router.post("/admin/register", registerAdmin);   // Admin registration route

export default router;
