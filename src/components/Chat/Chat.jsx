import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChatItemsContainer, Input, InputGroup, Message, MessageInputContainer } from "./ChatElement";
import ChatArea from "./ChatArea/ChatArea";
import ChatMessage from "./DummyChat/ChatMessage";
import ChatMessageSelf from "./DummyChat/ChatMessageSelf";
import chatData from "./DummyChat/ChatData";
import SendMessage from "./SendMessage";
import { BiSend } from "react-icons/bi";

const Chat = ({ ws, setNewMessageText, messages, sendMessage, setMessages, newMessageText }) => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();
    const channelId = location.pathname.replace("/dashboard/chat/", "");
    const [channel, setChannel] = useState(null);

    useEffect(() => {
        const foundChannel = chatData.channels.find((ch) => ch.id === channelId);
        setChannel(foundChannel);
    }, [channelId]);

    console.log(messages);

    if (!channel) {
        return (
            <ChatItemsContainer>
                <MessageInputContainer>
                    {messages.map((message, index) =>
                        message.sender === user?._id ? (
                            <ChatMessageSelf
                                user={user?._id}
                                key={index}
                                sender={message.sender}
                                recipient={message.recipient}
                                message={message.text}
                                isOur={message.isOur}
                            />
                        ) : (
                            <ChatMessage
                                user={user?._id}
                                key={index}
                                sender={message.sender}
                                recipient={message.recipient}
                                message={message.text}
                                isOur={message.isOur}
                            />
                        ),
                    )}
                    <Message>
                        <Input
                            value={newMessageText}
                            onChange={(ev) => setNewMessageText(ev.target.value)}
                            placeholder="Type your message here"
                        />
                        <InputGroup>
                            <BiSend onClick={sendMessage} />
                        </InputGroup>
                    </Message>
                </MessageInputContainer>
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
