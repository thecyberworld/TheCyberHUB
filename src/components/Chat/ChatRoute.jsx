import React from "react";
import { Route, Routes } from "react-router-dom";
import { ChatRoutesContainer } from "./ChatElement";
import Sidebar from "./Sidebar/Sidebar";
import { Chat } from "../index";
import chatData from "./DummyChat/ChatData";

const ChatRoute = () => {
    return (
        <ChatRoutesContainer>
            <Sidebar />

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <Routes>
                    {/* <Route index element={<Chat />} /> */}
                    {chatData.channels.map((channel) => (
                        <Route key={channel.id} path={channel.id} element={<Chat channelId={channel.id} />} />
                    ))}
                </Routes>
            </div>
        </ChatRoutesContainer>
    );
};

export default ChatRoute;
