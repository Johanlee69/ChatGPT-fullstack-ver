import Chat from "../../DB/Modules/Chatsave.js";

export const FetchChat = async (req, res) => {
  try {
    const { email } = req.user;

    const chatDocs = await Chat.find({ UserEmail: email });

    const formattedChats = chatDocs.map(chat => ({
      id: chat.uID,
      title: chat.tittle,
      messages: chat.messages,
      timestamp: chat.timestamp
    }));

    res.status(200).json(formattedChats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Message: "failed" });
  }
};
