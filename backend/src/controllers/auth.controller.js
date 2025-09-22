import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({message:"All fields are required."})
        }

        if (password.length < 6) {
            return res.status(400).json({message:"Password must be at least 6 characters long"})
        }

        const user = await User.findOne({ email: email });

        if (user) {
            return res.status(400).json({message:"Email already exists."})
        }

        // Hash the incoming password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic:newUser.profilePic
            })
        }
        else {
            return res.status(400).json({message:"Invalid user data"})
        }

    } catch (error) {
        console.log("Error signing up", error)
        return res.status(400).json({message:"Something went wrong signup user. "})
    }
}