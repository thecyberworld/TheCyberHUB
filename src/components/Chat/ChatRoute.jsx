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

            <Routes>
                {/* <Route index element={<Chat />} /> */}
                {chatData.channels.map((channel) => (
                    <Route key={channel.id} path={channel.id} element={<Chat channelId={channel.id} />} />
                ))}
            </Routes>
        </ChatRoutesContainer>
    );
};

export default ChatRoute;
