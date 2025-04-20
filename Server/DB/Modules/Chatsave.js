import mongoose from "mongoose"
const ChatSaveSchema = new mongoose.Schema({
    UserName : String,
    UserEmail : String,
    uID : String,
    messages : Array,
    timestamp : String,
    tittle : String
})

const Chat = mongoose.model('Chatlog',ChatSaveSchema);

export default Chat;