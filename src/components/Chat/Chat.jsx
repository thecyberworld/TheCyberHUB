import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChatItemsContainer } from "./ChatElement";
import ChatArea from "./ChatArea/ChatArea";
import ChatMessage from "./DummyChat/ChatMessage";
import ChatMessageSelf from "./DummyChat/ChatMessageSelf";
import chatData from "./DummyChat/ChatData";
import SendMessage from "./SendMessage";

const Chat = () => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();
    const channelId = location.pathname.replace("/dashboard/chat/", "");
    const [channel, setChannel] = useState(null);

    useEffect(() => {
        const foundChannel = chatData.channels.find((ch) => ch.id === channelId);
        setChannel(foundChannel);
    }, [channelId]);

    if (!channel) {
        return (
            <ChatItemsContainer>
                <div>
                    <h2>Channel not found</h2>
                </div>
            </ChatItemsContainer>
        );
    }

    return (
        <ChatItemsContainer>
            <ChatArea name={channel.channelname} />
            <div
                style={{
                    height: "100%",
                    overflowY: "scroll",
                    display: "flex",
                    flexDirection: "column-reverse",
                    padding: "0 10px",
                }}
            >
                {channel.messages.map((message, index) =>
                    message.username === user.username ? (
                        <ChatMessageSelf key={index} {...message} />
                    ) : (
                        <ChatMessage key={index} {...message} />
                    ),
                )}
            </div>
            <SendMessage />
        </ChatItemsContainer>
    );
};

export default Chat;
