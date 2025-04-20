import React, { useContext } from "react";
import "./main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context";
import Profile from "../Profile";

function Main() {
  const {
    input,
    setinput,
    onSent,
    ShowResult,
    handle0nclick_default,
    showSidebar,
    handleopen_btn,
    userPrompts,
    AIResponse,
    ProfilePopUp,
    SetProfilePopUp,
  } = useContext(Context);
 
  const handleInputKey = (event) => {
    if (event.key === "Enter") {
      onSent();
    }
  };
  
  
  return (
    <div className="main">
      <div className="content  bg-neutral-800">
        <nav className="flex justify-between font-bold ">
          <div className="flex">
            {!showSidebar ? (
              <img
                src={assets.close_icon}
                alt="logo"
                className="open_ invert cursor-pointer"
                width={32}
                onClick={handleopen_btn}
              />
            ) : (
              <img
                src={assets.close_icon}
                alt="logo"
                className="invert hidden cursor-pointer mr-2  hover:bg-neutral-700 p-4 rounded-xl"
                width={32}
              />
            )}

            <div
              className="flex items-center gap-3 ml-2 hover:bg-neutral-700 p-4 rounded-xl text-white cursor-pointer"
              onClick={handle0nclick_default}
            >
              <img
                src={assets.chatGPT_icon}
                alt="logo"
                className="invert"
                width={22}
              />
              ChatGPT
            </div>
          </div>
          <div className="hover:bg-neutral-700 p-2 rounded-full mr-3 relative">
            <img
              src={assets.profile_icon}
              alt="user"
              width={50}
              className="rounded-full bg-white p-1 cursor-pointer"
              onClick={() => SetProfilePopUp(!ProfilePopUp)}
            />
            {ProfilePopUp && <Profile />}
          </div>
        </nav>
        <main>
          {ShowResult ? (
            <div>
              <div className="response_clust overflow-auto h-full">
                <div className="response_ mb-[10%]">
                  {userPrompts.map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-end">
                        <p className="recent text-white bg-neutral-700 p-5 rounded-3xl overflow-auto max-w-xl break-words mb-10">
                          {item}
                        </p>
                      </div>
                      {AIResponse[i] && (
                        <div className="result text-white">
                          <img
                            src={assets.chatGPT_icon}
                            width={"40px"}
                            alt="chatgpt_icon"
                            className="invert p-2 border border-slate-500 rounded-full"
                          />
                          <p
                            className="text-white mt-6 mb-8 overflow-auto w-3/4"
                            dangerouslySetInnerHTML={{ __html: AIResponse[i] }}
                          ></p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* Input field */}
              <div className="flex justify-center">
                <div className="text_input fixed bottom-0 bg-neutral-700 p-4 rounded-xl">
                  <input
                    type="text"
                    placeholder="Continue the conversation..."
                    onChange={(e) => setinput(e.target.value)}
                    value={input}
                    onKeyDown={handleInputKey}
                    className="input_text bg-neutral-700 outline-none text-white"
                  />
                  <div className="flex justify-between mt-2">
                    <img
                      src={assets.gallery_icon}
                      alt="image"
                      className="invert cursor-pointer"
                      width={30}
                    />
                    <img
                      src={assets.send_icon}
                      alt="sent"
                      onClick={() => onSent()}
                      className="invert cursor-pointer"
                      width={30}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mid_">
              <div className="flex justify-center">
                <div className="text-white md:text-4xl font-bold text-2xl">
                  What can I help with?
                </div>
              </div>
              {/* Input field */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <div className="text_input bg-neutral-700 p-4 rounded-xl">
                  <input
                    type="text"
                    placeholder="Message ChatGPT"
                    onKeyDown={handleInputKey}
                    onChange={(e) => setinput(e.target.value)}
                    value={input}
                    className="input_text bg-neutral-700 outline-none text-white"
                  />
                  <div className="flex justify-between mt-2">
                    <img
                      src={assets.gallery_icon}
                      alt="image"
                      className="invert cursor-pointer"
                      width={30}
                    />
                    <img
                      src={assets.send_icon}
                      alt="sent"
                      onClick={() => onSent()}
                      className="invert cursor-pointer"
                      width={30}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
        <div className="flex justify-center items-center text-zinc-400">
          <footer className="fixed bottom-0 mb-3 text-center">
            ChatGPT can make mistakes. Because I made a mistake of trying
            software development (pun intended)
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Main;
