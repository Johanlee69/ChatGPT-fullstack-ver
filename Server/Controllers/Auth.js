import jwt from 'jsonwebtoken'

export const TokenGeneration = (email,name, password)=>{
    const token = jwt.sign({Email : email,Name : name, Password : password},process.env.SCERET_KEY,{expiresIn : '1hr'});
    return token;
}
export const verify=(req,res,next)=>{
    try{
    const token = req.cookies.Token;
    if(!token){
        return res.status(401).json({message : "Token is missing"})
    }
    const decoded = jwt.verify(token,process.env.SCERET_KEY);
    req.user = {
        name : decoded.Name,
        email : decoded.Email,
    };
    return next();
}
    catch(error){
    return res.status(401).json({message : "Token is invalid or expired"})
}
}

