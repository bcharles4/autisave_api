import mongoose from "mongoose";
import Users from "../backend/models/users.model.js";

export const userCredentials = async (req, res) => {
    const users = req.body;

    if (!users.gameID || !users.age ) {
        res.status(400).send("Invalid data");
        return;
    }

    const newUser = new Users(users);
    try {
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }


};

export const getUsers = async (req, res) => {
    try {
        const users = await Users.find({});
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params; // Get the user ID from the request parameters

    try {
        // Check if the user exists
        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Delete the user
        await Users.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const loginUser = async (req, res) => {
    const { username } = req.body; // Extract the username from the request body

    if (!username) {
        return res.status(400).json({ success: false, message: "Username is required" });
    }

    try {
        // Check if the user exists in the database
        const user = await Users.findOne({ gameID: username }); // Assuming `gameID` is the username field in your schema

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Respond with success if user exists
        res.status(200).json({ success: true, message: "Login successful", data: user });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ success: false, message: error.message });
    }
};





// export const deletePatient = async (req, res) => {
//     const { patientID } = req.params; // Extract patientID from the request parameters
//     console.log(`Received Patient ID: ${patientID}`); // Log the patientID for debugging

//     try {
//         // Attempt to delete the patient by their patientID
//         const deletedPatient = await Patient.findOneAndDelete({ patientID: patientID });

//         // If no patient was found, return 404
//         if (!deletedPatient) {
//             return res.status(404).json({ 
//                 success: false, 
//                 message: "Patient not found with the given Patient ID" 
//             });
//         }

//         // Successfully deleted
//         res.status(200).json({ 
//             success: true, 
//             message: "Patient Updated Successfully!", 
//             data: deletedPatient 
//         });
//     } catch (error) {
//         // If there's an error, log it and send a response
//         console.error('Error deleting patient:', error);
//         res.status(500).json({ 
//             success: false, 
//             message: "An error occurred while deleting the patient", 
//             error: error.message 
//         });
//     }
// };



export const updateUserScore = async (req, res) => {
    const { gameID, score } = req.body;

    if (!gameID || typeof score !== "number") {
        return res.status(400).json({ success: false, message: "Invalid data" });
    }

    try {
        // Find the user by gameID
        let user = await Users.findOne({ gameID });

        if (user) {
            // User exists; update their score
            user.score += score; // Add the new score to the existing score
            await user.save();
            return res.status(200).json({ success: true, message: "Score updated successfully", data: user });
        } else {
            // User doesn't exist; create a new user
            const newUser = new Users({ gameID, age: req.body.age, score });
            await newUser.save();
            return res.status(201).json({ success: true, message: "User created and score saved", data: newUser });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
