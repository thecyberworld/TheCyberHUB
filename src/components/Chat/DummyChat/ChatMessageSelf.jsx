import React from "react";
import { MessageContainerSelf, MessageContentSelf, Timestamp } from "./ChatMessageElement";

const ChatMessageSelf = ({ username, message, image, time, sender }) => {
    return (
        <MessageContainerSelf>
            {/* <SenderImage src={image} alt="" /> */}
            <MessageContentSelf>
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
            </MessageContentSelf>
        </MessageContainerSelf>
    );
};

export default ChatMessageSelf;
