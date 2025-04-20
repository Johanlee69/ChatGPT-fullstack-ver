import React, { useContext } from 'react'
import { Context } from '../context'
import { useNavigate } from 'react-router'
import api from '../config'

const Profile =  () => {
    const {SetProfilePopUp, SetLoggedIN} = useContext(Context)
    const Navigate = useNavigate()
    const handleLogOUT = async ()=>{
        try {
            await api.post('/LogOut')
            localStorage.clear();
            SetLoggedIN(false);
            SetProfilePopUp(false)
            Navigate('/login')
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }
  return (
    <div className='absolute bg-neutral-600 flex flex-col w-[200px] right-[10%] top-[100%] justify-center rounded-xl text-center text-white'>
        <div className='flex justify-end mx-2'>
            <button className='text-sm bg-red-500 px-2 mt-2 rounded text-center' onClick={()=>SetProfilePopUp(false)}>x</button>
        </div>
        <p>{localStorage.getItem('username')}</p>
        <button className='p-2 bg-red-500 mx-[10%] m-5 rounded text-sm' onClick={handleLogOUT}>Log out</button>
    </div>
  )
}

export default Profile
