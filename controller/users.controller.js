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
