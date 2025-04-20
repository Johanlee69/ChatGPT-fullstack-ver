import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    Token : String,
})

export const Token = mongoose.model('Token',TokenSchema);