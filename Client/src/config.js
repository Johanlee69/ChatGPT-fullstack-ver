import axios from "axios";

const api = axios.create({
    baseURL: "https://chatgpt-fullstack-ver-uprw.onrender.com",
    withCredentials: true, 
});

export default api;
