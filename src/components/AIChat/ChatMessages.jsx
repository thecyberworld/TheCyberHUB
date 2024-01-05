import React, { useEffect, useRef } from "react";
import { Messages, MessagesContainer, UserMessage } from "./AIChatElements";
import MDEditor from "@uiw/react-md-editor";

const ChatMessages = ({ messages }) => {
    const messagesContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        setTimeout(() => {
            scrollToBottom();
        }, 0);
    }, [messages]);

    return (
        <MessagesContainer>
            <Messages ref={messagesContainerRef}>
                {messages.map((message, index) =>
                    message.type === "bot" ? (
                        <MDEditor.Markdown
                            key={message._id}
                            style={{
                                background: "#171717",
                                textAlign: "left",
                                width: "100%",
                                padding: "20px",
                                borderRadius: "5px",
                                fontSize: "18px",
                            }}
                            source={message.content || ""}
                        />
                    ) : (
                        <UserMessage> {message.content} </UserMessage>
                    ),
                )}
            </Messages>
        </MessagesContainer>
    );
};

export default ChatMessages;
