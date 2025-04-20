import Chat from "../../DB/Modules/Chatsave.js";

export const ChatSave = async (req, res) => {
    const { chatId, messages, timestamp, title } = req.body;
    const { name, email } = req.user;
    
    try {
        const existingChat = await Chat.findOne({
            UserEmail: email,
            uID: chatId
        });
        
        if (existingChat) {
            existingChat.messages = messages;
            existingChat.timestamp = timestamp;
            existingChat.tittle = title;
            await existingChat.save();
            
            res.status(200).json({ 
                message: "Chat updated successfully",
                chat: existingChat
            });
        } else {
            const newChatHistory = new Chat({
                UserName: name,
                UserEmail: email,
                uID: chatId,
                messages: messages,
                timestamp: timestamp,
                tittle: title
            });
            
            await newChatHistory.save();
            
            res.status(201).json({ 
                message: "New chat created successfully",
                chat: newChatHistory
            });
        }
    } catch (error) {
        console.error("Error saving chat:", error);
        res.status(500).json({ message: "Server error" });
    }
}