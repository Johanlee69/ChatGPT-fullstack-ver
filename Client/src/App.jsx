import "./App.css";
import Homepage from "./components/Homepage.jsx";
import { Routes, Route, useNavigate } from "react-router";
import Login from "./components/Login.jsx";
import { useContext, useEffect, useState } from "react";
import { Context } from "./context.jsx";
import api from "./config.js";
function App() {
  const Navigate = useNavigate();
  const [isloading,setLoading] = useState(true)
  const { loggedIN, SetLoggedIN } = useContext(Context);

  useEffect(() => {
    const Auth = async () => {
      try {
        const res = await api.get("/CheckAuth");
        SetLoggedIN(true);
      } catch (error) {
        SetLoggedIN(false);
      } finally {
        setLoading(false)
      }
    };
    Auth();
  }, []);
  
  useEffect(() => {
    loggedIN ? Navigate("/") : Navigate("/login");
  }, [loggedIN]);

  if(isloading){
    return <div className="bg-neutral-800 w-full">...</div>
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={loggedIN ? <Homepage /> : <Login /> } />
      </Routes>
    </>
  );
}

export default App;
