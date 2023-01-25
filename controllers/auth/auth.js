import usersModel from '../../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ----- Login -----
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await usersModel.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "10d" });
        res.status(200).json({token, user: existingUser.name});
    } catch (err) {
        res.status(500).json({message: "Something went wrong"});
        console.log(err);
    }
}


// ----- Register -----
export const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    
    try {
        const existingUser = await usersModel.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User with this email already exist" });
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await usersModel.create({
            name: `${firstName} ${lastName}`,
            email,
            password: hashedPassword
        });

        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(err);
    }
}