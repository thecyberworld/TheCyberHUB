import React from "react";
// import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { ChatItemsContainer } from "./ChatElement";
import ChatArea from "./ChatArea/ChatArea";

const Chat = () => {
    return (
        // <Wrapper>
        <ChatItemsContainer>
            <ChatArea />
        </ChatItemsContainer>
        // </Wrapper>
    );
};

export default Chat;
