import React from "react";
import { Wrapper } from "../Profile/ProfileElements";
import { RouterButton } from "../../Other/MixComponents/Buttons/ButtonElements";

const ChatHome = () => {
    return (
        <Wrapper
            style={{
                fontSize: 25,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: "10px",
            }}
        >
            <h2>Welcome</h2>
            <p>
                Want to connect and communicate <br />
                with a vibrant community of like-minded people?
            </p>
            <br /> <br />
            <RouterButton to="/chat">Join the Chatroom!</RouterButton>
        </Wrapper>
    );
};

export default ChatHome;
