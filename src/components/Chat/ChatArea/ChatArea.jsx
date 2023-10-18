import React from "react";
import { ChatContainer, LeftNav, RightNav } from "../ChatElement";
import { FaPhoneAlt, FaVideo, FaUserCircle } from "react-icons/fa";

const ChatArea = () => {
    return (
        <>
            <ChatContainer>
                <LeftNav>
                    Security / <h6>General</h6>
                </LeftNav>
                <RightNav>
                    <li>
                        <FaVideo />
                    </li>
                    <li>
                        <FaPhoneAlt />
                    </li>
                    <li>
                        <FaUserCircle />
                    </li>
                </RightNav>
            </ChatContainer>
        </>
    );
};

export default ChatArea;
