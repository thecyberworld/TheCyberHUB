import React from "react";
import { Route, Routes } from "react-router-dom";
import { ChatRoutesContainer } from "./ChatElement";
import Sidebar from "./Sidebar/Sidebar";
import { Chat } from "../index";

const ChatRoute = () => {
    return (
        <ChatRoutesContainer>
            <Sidebar />

            <Routes>
                <Route index element={<Chat />} />
            </Routes>
        </ChatRoutesContainer>
    );
};

export default ChatRoute;
