import React from "react";
import { MessageContainer, MessageContent, Timestamp, SenderImage } from "./ChatMessageElement";

const ChatMessage = ({ message, image, time, sender }) => {
    return (
        <MessageContainer>
            <SenderImage src={image} alt="Sender's Image" />
            <MessageContent>
                <p>{message}</p>
                <Timestamp>Today at {time}</Timestamp>
            </MessageContent>
        </MessageContainer>
    );
};

export default ChatMessage;
