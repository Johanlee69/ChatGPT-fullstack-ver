import user from "../../DB/Modules/user.js"
import bcryptjs from "bcryptjs"
import { Token } from "../../DB/Modules/Token.js"
import { TokenGeneration } from "../Auth.js"

export const FunRegister = async (req, res) => {
    try { 
        const { email, name, password } =  req.body;
        
        if (!email || !name || !password) {
            return res.status(400).json({ message: "Email, name, and password are required" });
        }

        const existingUser = await user.findOne({ Email: email });

        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
    
        const newUser = new user({
            name: name, 
            email: email, 
            password: hashedPassword
        });
        await newUser.save();

        const token = TokenGeneration(email, name, password);
        const newToken = new Token({
            Token: token
        });
        await newToken.save();
        
        res.cookie('Token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 3600000
        });
        
        res.status(200).json({ name: name, message: "User created, logging in" });
    }
    catch (err) {
        console.error("Registration error:", err);
        res.status(400).json({ message: "Could not save data", error: err.message });
    }
}