import mongoose from "mongoose";

export const database = ()=>{
mongoose.connect(process.env.DB_Connect)
    .then(()=>{
        console.log('Database connection successful')
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
}