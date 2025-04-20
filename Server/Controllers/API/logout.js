import { Token } from "../../DB/Modules/Token.js";
import jwt from "jsonwebtoken"

export const FunLogOuT = async (req,res)=>{
    try {
        const token = req.cookies.Token;
        if (!token) {
            return res.status(200).json({ message: "Already logged out" });
        }
        
        try {
            const decoded = jwt.verify(token, process.env.SCERET_KEY);
            if (!decoded) {
                return res.status(401).json({ message: "Invalid token" });
            }
            await Token.deleteOne({
                Token : token
            });
        } catch (tokenError) {
            console.log("Token verification error:", tokenError);
        }
        
        res.clearCookie("Token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
            path: "/"
        });
        
        res.status(200).json({message: "Logging out.."})
    } catch (error) {
        res.status(500).json({message: "Log out failed (500)"})
        console.log(error)
    }
}