import React from "react";
import { MessageContainer, MessageContent, Timestamp } from "./ChatMessageElement";

const ChatMessage = ({ username, message, sender, recipient, image, user }) => {
    console.log(user === sender);
    console.log(sender, recipient, message);
    return (
        <MessageContainer>
            {/* <SenderImage src={image} alt="" /> */}
            <MessageContent>
                {/* <h4>{username}</h4> */}
                <p>{message}</p>
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
                    {/* {time} */}
                </Timestamp>
            </MessageContent>
        </MessageContainer>
    );
};

export default ChatMessage;
