import Chat from "../../DB/Modules/Chatsave.js";

export const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.body;
    await Chat.findOneAndDelete({ uID: chatId });
    res.status(201).json({
      message: "deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "failed to delete",
    });
  }
};
