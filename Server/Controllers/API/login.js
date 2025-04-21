import user from "../../DB/Modules/user.js"
import bcryptjs from "bcryptjs"
import { TokenGeneration } from "../Auth.js"
import { Token } from "../../DB/Modules/Token.js"
export const FunLogin = async (req,res)=>{
    try {
        const {email, password} = req.body
        const ValidUser = await user.findOne({
            email : email
        })
        if (!ValidUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcryptjs.compare(password, ValidUser.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = TokenGeneration(email,ValidUser.name,password);
        const newTOken = new Token({
            Token : token
        })
         await newTOken.save()
         res.cookie('Token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 3600000,
            path: "/"
         })
        res.status(200).json({name : ValidUser.name, message: "Loggin-in..."})
    } catch (error) {
        res.status(400).json({message: 'login failed'})
        console.log(error)
    }
}

 
