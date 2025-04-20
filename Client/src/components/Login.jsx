import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { Context } from "../context";
import api from "../config";
import { useNavigate } from "react-router";
const Login = () => {
  const {
    register,
    handleSubmit,
    reset,isSubmitting,
    formState: { errors },
  } = useForm();
  
  const {SetLoggedIN,loggedIN} = useContext(Context)
  const [newUser,SetnewUSer] = useState(false)
  const Navigate = useNavigate();
  
  useEffect(()=>{
  },[loggedIN])

  const onSubmit = async (data) =>{
    if(newUser){
        const res = await api.post('/Register',data)
        localStorage.setItem('username',res.data.name)
        SetLoggedIN(true);
        Navigate('/')
        reset()
    }
    else{
        const res = await api.post('/Login',data)
        localStorage.setItem('username',res.data.name)
        SetLoggedIN(true);
        reset()
    }
    
  }

  return (
    <div className="flex justify-center items-center w-full h-screen bg-neutral-800">
      <div className="min-w-[20vw] min-h-[50vh] flex flex-col justify-center items-center bg-neutral-900 rounded-xl text-white p-6 relative">
      <div className="bg-gray-500 text-white p-3 animate-bounce hover:animate-none rounded-xl absolute text-center top-[-30%] cursor-pointer"><p> Default credentials <br /> [ test@eample.com, 12345678 ]</p></div>
        <div className="mb-4 text-xl font-semibold">
            Login to ChatGPT using Email
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-[300px]">
            {newUser && <div className="flex flex-col mb-4">
                <p className="mb-1">Name</p>
                 <input {...register("name", { required: "Name is required"})} 
                   className="bg-slate-500 p-2 rounded w-full" placeholder="Email"/>
                 {errors.email && <span className="text-red-700 text-sm mt-1">{errors.email.message}</span>}
            </div>}
            <div className="flex flex-col mb-4">
                <p className="mb-1">Email</p>
                 <input {...register("email", { required: "Email is required"})} 
                   className="bg-slate-500 p-2 rounded w-full" placeholder="Email"/>
                 {errors.email && <span className="text-red-700 text-sm mt-1">{errors.email.message}</span>}
            </div>
            <div className="flex flex-col mb-4">
                <p className="mb-1">Password</p>
                 <input 
                   type="password"
                   {...register("password", { 
                     required: "Password is required",
                     minLength: {value: 8, message: "Password should be 8 characters long"}
                   })} 
                   className="bg-slate-500 p-2 rounded w-full" placeholder="Password" />
                {errors.password && <span className="text-red-700 text-sm mt-1 break-words w-full">{errors.password.message}</span>}
            </div>
        <span onClick={()=>{SetnewUSer(!newUser), reset()}} className="cursor-pointer text-center mt-2">{newUser? 'Already have an account ?': 'create a new account to login'}</span>
          <div className="flex justify-center mt-6">
                <button type="submit" className="bg-blue-500 p-3 rounded hover:bg-blue-600 transition-colors" disabled={isSubmitting} >{newUser ? 'Register':'Login'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
