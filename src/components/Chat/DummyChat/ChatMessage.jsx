import React from "react";
import { MessageContainer, MessageContent, SenderImage, Timestamp } from "./ChatMessageElement";

const ChatMessage = ({ username, message, sender, recipient, image, user, isOur }) => {
    return (
        <MessageContainer isOur={isOur}>
            <SenderImage
                src={
                    "https://thecyberhub-assets.s3.ap-south-1.amazonaws.com/thecyberhub-assets/development/user/1692524710620.jpeg"
                }
                alt=""
            />
            <MessageContent isOur={isOur}>
                {message || ""}
                <Timestamp
                    style={{
                        color: "#dcdcdc",
                        fontSize: "10px",
                        fontWeight: "bold",
                        textAlign: "right",
                        marginRight: "10px",
                        marginTop: "5px",
                    }}
                >
                    {"time"}
                </Timestamp>
            </MessageContent>
        </MessageContainer>
    );
};

export default ChatMessage;
