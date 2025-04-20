import { createContext, useState, useEffect } from "react";
import api from "./config";
export const Context = createContext();
import { v4 as uuidv4 } from 'uuid';

const ContextProvider = (props) => {
    const [input, setinput] = useState("");
    const [Result, setResult] = useState("");
    const [ShowResult, setShowResult] = useState(false)
    const [showSidebar, setSidebar] = useState(true)
    const [userPrompts, setUserPrompst] = useState([])
    const [AIResponse, setAIresponse] = useState([])
    const [isloading, setLoading] = useState(true)
    const [ProfilePopUp, SetProfilePopUp] = useState(false)
    const [loggedIN, SetLoggedIN] = useState(false)
    const [chatHistory, setChatHistory] = useState([])
    const [selectedChat, setSelectedChat] = useState(null)
    
    useEffect(() => {
        const fetchChatsFromServer = async () => {
            if (loggedIN) {
                try {
                    const res = await api.get('/FetchChathistory')
                    if(res.data && res.data.length > 0) {
                        console.log("Chat history fetched:", res.data);
                        setChatHistory(res.data);
                        localStorage.setItem('chatHistory', JSON.stringify(res.data));
                    }
                } catch (error) {
                    console.error('Failed to fetch chats from server:', error);
                }
            }
        };   
        fetchChatsFromServer();
    }, [loggedIN]);
    
    const handle0nclick_default = () => {
        setShowResult(false);
        setResult("");
        setSelectedChat(null);
        setUserPrompst([]);
        setAIresponse([]);
    }
    
    useEffect(() => {
        if (window.innerWidth <= 500) {
            setSidebar(false)
        }
    })
    
    const handleclose_btn = () => {
        const element = document.querySelector('.side_bar')
        if (element) {
            element.style.width = '0px';
            setTimeout(() => {
                element.style.display = 'none';
                setSidebar(false)
            }, 200);
        }
    }
    
    const handleopen_btn = () => {
        const element = document.querySelector('.side_bar')
        if (element) {
            element.style.display = 'block';
            setSidebar(true)
            setTimeout(() => {
                element.style.width = '420px';
            }, 50);
        }
    }

    const onSent = async (prompt) => {
        setinput("");
        setResult("");
        setShowResult(true);
        let response;
        let currentPrompt;
        
        if (prompt !== undefined) {
            currentPrompt = prompt;
            const res = await api.post('/Gemini', { prompt: prompt })
            response = res.data.Message
            setUserPrompst(prev => [...prev, prompt]);
        }
        else {
            currentPrompt = input;
            setUserPrompst(prev => [...prev, input])
            const res = await api.post('/Gemini', { prompt: input })
            response = res.data.Message
        }

        let newResArray = response.split("**");
        let newResponse = [];
        for (let i = 0; i < newResArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += newResArray[i];
            }
            else {
                newResponse += "<b>" + newResArray[i] + "</b>";
            }
        }
        let FinalResponse = newResponse.split("*").join("</br></br>");
        setResult(FinalResponse);
        setAIresponse(prev => [...prev, FinalResponse]);
        
        if (loggedIN) {
            saveConversationToHistory(currentPrompt, FinalResponse);
        }
    }
    
    const saveConversationToHistory = async (prompt, response) => {
        try {
            const timestamp = new Date().toISOString();
            const chatId = selectedChat || uuidv4();
            
            let newChat;
            let updatedHistory;
            
            if (selectedChat) {
                // Find existing chat and update it
                const existingChat = chatHistory.find(chat => chat.id === selectedChat);
                if (!existingChat) return;
                
                const updatedMessages = [...existingChat.messages, { prompt, response, timestamp }];
                
                newChat = {
                    ...existingChat,
                    messages: updatedMessages,
                };
                
                updatedHistory = chatHistory.map(chat => 
                    chat.id === selectedChat ? newChat : chat
                );
            } else {
                // Create new chat
                newChat = {
                    id: chatId,
                    title: prompt.substring(0, 30) + (prompt.length > 30 ? '...' : ''),
                    timestamp,
                    messages: [{ prompt, response, timestamp }]
                };
                
                updatedHistory = [newChat, ...chatHistory];
                setSelectedChat(chatId);
            }
            
            // Update local state and localStorage
            setChatHistory(updatedHistory);
            localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
            if (loggedIN) {
                const saveData = {
                    chatId: chatId,
                    title: newChat.title,
                    messages: newChat.messages,
                    timestamp: timestamp
                };
                
                const res = await api.post('/Save', saveData);
                console.log('Server response:', res.data.message);
            }
        } catch (error) {
            console.error('Error saving chat:', error);
        }
    }
    
    const loadConversation = (chatId) => {
        const selectedConversation = chatHistory.find(chat => chat.id === chatId);
        if (selectedConversation) {
            setSelectedChat(chatId);
            const prompts = selectedConversation.messages.map(msg => msg.prompt);
            const responses = selectedConversation.messages.map(msg => msg.response);
            setUserPrompst(prompts);
            setAIresponse(responses);
            setShowResult(true);
            if (responses.length > 0) {
                setResult(responses[responses.length - 1]);
            }
        }
    }
    
    const deleteConversation = async (chatId) => {
        try {
            const updatedHistory = chatHistory.filter(chat => chat.id !== chatId);
            setChatHistory(updatedHistory);
            localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
            
            if (selectedChat === chatId) {
                handle0nclick_default();
            }
            if (loggedIN) {
                await api.post('/DeleteChat', { chatId });
            }
        } catch (error) {
            console.error('Error deleting chat:', error);
        }
    }

    const contextValue = {
        input, setinput,
        onSent, handle0nclick_default, handleclose_btn, handleopen_btn,
        ShowResult, setShowResult,
        Result, setResult,
        showSidebar, setSidebar,
        userPrompts, setUserPrompst,
        AIResponse, setAIresponse,
        loggedIN, SetLoggedIN,
        ProfilePopUp, SetProfilePopUp, isloading, setLoading,
        chatHistory, setChatHistory,
        selectedChat, setSelectedChat,
        loadConversation, deleteConversation
    }
    
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider;