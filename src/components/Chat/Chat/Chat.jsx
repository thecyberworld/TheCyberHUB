import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChatItemsContainer, Input, InputGroup, Message, MessageInputContainer } from "./ChatElement";
import ChatArea from "../ChatArea/ChatArea";
import ChatMessage from "../DummyChat/ChatMessage";
import ChatMessageSelf from "../DummyChat/ChatMessageSelf";
import chatData from "../DummyChat/ChatData";
import SendMessage from "../SendMessage";
import { BiSend } from "react-icons/bi";
import ChatHeader from "./ChatHeader";

const Chat = ({
    ws,
    setNewMessageText,
    messages,
    sendMessage,
    setMessages,
    newMessageText,
    divUnderMessage,
    setHideSidebar,
    hideSidebar,
}) => {
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
                <ChatHeader hideSidebar={hideSidebar} setHideSidebar={setHideSidebar} />
                <MessageInputContainer>
                    {messages?.map((message, index) => (
                        <ChatMessage
                            user={user?._id}
                            key={index}
                            sender={message.sender}
                            recipient={message.recipient}
                            message={message.text}
                            isOur={message.sender === user?._id}
                        />
                    ))}

                    <div ref={divUnderMessage} />
                </MessageInputContainer>
                <Message>
                    <Input
                        value={newMessageText}
                        onChange={(ev) => setNewMessageText(ev.target.value)}
                        placeholder="Type your message here"
                    />

                    <InputGroup>
                        <BiSend onClick={sendMessage} color={"#ff6b08"} />
                    </InputGroup>
                </Message>
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
