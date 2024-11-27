import express from "express";
import { userCredentials, getUsers, deleteUser} from "../controller/users.controller.js"; // Ensure the file extension is correct

const router = express.Router();


router.get("/", getUsers);
router.post("/newUser", userCredentials);
router.delete('/:id', deleteUser);      // Delete user by ID


export default router;