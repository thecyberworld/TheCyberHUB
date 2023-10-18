import React from "react";
import { MessageContainerSelf, MessageContentSelf, Timestamp, SenderImage } from "./ChatMessageElement";

const ChatMessageSelf = ({ message, image, time, sender }) => {
    return (
        <MessageContainerSelf>
            <SenderImage src={image} alt="Sender's Image" />
            <MessageContentSelf>
                <p>{message}</p>
                <Timestamp>Today at {time}</Timestamp>
            </MessageContentSelf>
        </MessageContainerSelf>
    );
};

export default ChatMessageSelf;
