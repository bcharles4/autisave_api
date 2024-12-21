import express from "express";
import { userCredentials, getUsers, deleteUser, loginUser, updateUserScore} from "../controller/users.controller.js"; // Ensure the file extension is correct

const router = express.Router();


router.get("/", getUsers);
router.post('/login', loginUser); 
router.post("/newUser", userCredentials);
router.delete('/:id', deleteUser);      // Delete user by ID
router.post("/update-score", updateUserScore); // Route to handle score updates


export default router;