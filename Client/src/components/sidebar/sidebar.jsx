import React, { useContext, useEffect, useState } from 'react'
import './sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context'

const Sidebar = () => {
    const {  
        handle0nclick_default, 
        ShowResult, 
        handleclose_btn, 
        userPrompts, 
        chatHistory, 
        loadConversation,
        deleteConversation,
        selectedChat
    } = useContext(Context)
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    return (
        <div className='side_bar' >
            <div className='content_ top-0 sidebar bg-zinc-900 h-screen text-white p-4 overflow-y-auto'>
                <nav className='flex justify-between mb-1'>
                    <div className=' hover:bg-zinc-800 p-3 rounded-xl'>
                        <img src={assets.close_icon} alt="close" className='close_btn invert cursor-pointer' width={30} onClick={handleclose_btn} />
                    </div>
                    <div className='flex gap-1 cursor-pointer justify-center items-center '>
                        <div className=' hover:bg-zinc-800  p-3 rounded-xl '>
                            <img src={assets.search_icon} alt="search" className='invert ' width={30} />
                        </div>
                        <div className=' hover:bg-zinc-800 p-3 rounded-xl'>
                            <img src={assets.edit_icon} alt="edit" className='invert' width={30} onClick={handle0nclick_default} />
                        </div>
                    </div>
                </nav>
                <div className='sidebar_content'>
                    <div className='ml-1 mb-7'>
                        <div className='flex items-center gap-4 hover:bg-zinc-800 p-3 rounded-xl cursor-pointer' onClick={handle0nclick_default}>
                            <img src={assets.chatGPT_icon} alt="logo" className='invert ' width={22} />
                            New Chat
                        </div>
                        <div className='flex items-center gap-4 hover:bg-zinc-800 p-3 rounded-xl cursor-pointer'>
                            <img src={assets.explore_icon} alt="explore" className='invert items-center' width={22} />
                            Explore GPTS
                        </div>
                    </div>
                    
                    {/* Chat History Section */}
                    <div className='my-4'>
                        <h3 className='font-medium text-sm text-zinc-400 ml-3 mb-2'>Chat History</h3>
                        {chatHistory.length > 0 ? (
                            <div className='flex flex-col gap-1'>
                                {chatHistory.map(chat => (
                                    <div 
                                        key={chat.id} 
                                        className={`flex items-center justify-between p-2 hover:bg-zinc-800 rounded-lg cursor-pointer text-sm transition-colors ${selectedChat === chat.id ? 'bg-zinc-800' : ''}`}
                                    >
                                        <div 
                                            className='flex-1 overflow-hidden text-ellipsis whitespace-nowrap'
                                            onClick={() => loadConversation(chat.id)}
                                        >
                                            <div className='font-medium'>{chat.title}</div>
                                            <div className='text-xs text-zinc-400'>
                                                {formatDate(chat.timestamp)}
                                            </div>
                                        </div>
                                        <button 
                                            className='text-zinc-400 hover:text-red-500 p-1'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteConversation(chat.id);
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='text-sm text-zinc-400 ml-3 mt-2'>No saved conversations</div>
                        )}
                    </div>
                    
                    {/* Current Session Section */}
                    {ShowResult && userPrompts.length > 0 && !selectedChat && (
                        <div className='mt-4'>
                            <h3 className='font-medium text-sm text-zinc-400 ml-3 mb-2'>Current Session</h3>
                            <div className='cursor-pointer'>
                                <div className='mt-2 ml-3 overflow-hidden text-ellipsis whitespace-nowrap'>
                                    {userPrompts[0]}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
