import React, { useState, useEffect } from "react";
import axios from "axios";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { AIChatContainer, ChatHeader, ChatInput, ChatBox, ChatTitle, ToggleSection } from "./AIChatElements";
import ChatMessages from "./ChatMessages";
import RecentChats from "./RecentChats";
import { useSelector } from "react-redux";
import { BiSend } from "react-icons/bi";
import { CircleSpinner } from "react-spinners-kit";
import { getApiUrl } from "../../features/apiUrl";
import { toast } from "react-toastify";
import { SlOptionsVertical } from "react-icons/sl";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
// import LoginBox from "../Common/LoginBox";
// import {useNavigate} from "react-router-dom";
import AuthPopup from "../../pages/AuthPopup/AuthPopup";

const API_BASE_URL = getApiUrl("api/aiChat");

const AiChat = () => {
    // const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    // if (!user) {
    //     navigate("/login");
    // }

    const [chats, setChats] = useState([]);

    const [userInput, setUserInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [selectedChatId, setSelectedChatId] = useState(null);

    const [toggle, setToggle] = useState(false);
    const [showAuthPopup, setShowAuthPopup] = useState(false);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!user) {
            setShowAuthPopup(true);
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                `${API_BASE_URL}/ask/${selectedChatId}`,
                { prompt: userInput },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                },
            );

            const { chats } = response.data;
            setChats(chats);
            setUserInput("");
        } catch (error) {
            toast("Please enter your API Key");
            // toast(error.response.data);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getMessages = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/get`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const { chats } = response.data;
            setChats(chats);
            setSelectedChatId(chats.length > 0 ? chats.reverse()[0]?._id : null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleNewChat = async () => {
        setIsLoading(true);

        if (!user) {
            setShowAuthPopup(true);
            setIsLoading(false);
            return;
        }

        if (chats[chats.length - 1]?.title === "New Chat") {
            setSelectedChatId(chats[chats.length - 1]?._id);
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                `${API_BASE_URL}/create`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                },
            );

            const newChat = response.data;
            setChats([...chats, newChat]);
            setSelectedChatId(newChat._id);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteChat = async (chatId) => {
        setIsLoading(true);

        console.log("chatId", chatId);
        console.log("userId", user._id);
        try {
            await axios.delete(`${API_BASE_URL}/delete/${chatId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            });

            const newChats = chats.filter((chat) => chat._id !== chatId);
            setChats(newChats);
            setSelectedChatId(chats.length > 0 ? chats.reverse()[0]?._id : null);
        } catch (error) {
            toast(error.response.data);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!user) return;
        getMessages();
    }, []);

    useEffect(() => {
        if (chats.length === 0) {
            setTimeout(() => {
                // handleNewChat();
            }, 1000);
        }
    }, []);

    const handleCloseAuthPopup = () => {
        setShowAuthPopup(false);
    };

    console.log("showAuthPopup", showAuthPopup);
    console.log(selectedChatId);

    return (
        <Wrapper>
            {showAuthPopup && <AuthPopup onClose={() => handleCloseAuthPopup()} />}
            <AIChatContainer>
                {!toggle && (
                    <RecentChats
                        chats={chats}
                        setSelectedChatId={setSelectedChatId}
                        onNewChat={handleNewChat}
                        selectedChatId={selectedChatId}
                        onDeleteChat={handleDeleteChat}
                    />
                )}

                {selectedChatId ? (
                    chats.map(
                        (chat) =>
                            chat._id === selectedChatId && (
                                <ChatBox key={chat?._id}>
                                    <ChatHeader>
                                        <ToggleSection onClick={() => setToggle(!toggle)}>
                                            {toggle ? <FaAngleRight /> : <FaAngleLeft />}
                                        </ToggleSection>
                                        <ChatTitle>{chat?.title}</ChatTitle>
                                        <SlOptionsVertical />
                                    </ChatHeader>

                                    <ChatMessages messages={chat.messages} />

                                    <ChatInput onSubmit={handleSendMessage}>
                                        <input
                                            type="text"
                                            value={userInput}
                                            onChange={(e) => setUserInput(e.target.value)}
                                        />
                                        {isLoading ? (
                                            <button>
                                                <CircleSpinner size={20} color={"#131313"} />
                                            </button>
                                        ) : (
                                            <button type="submit">
                                                <BiSend size={25} />
                                            </button>
                                        )}
                                    </ChatInput>
                                </ChatBox>
                            ),
                    )
                ) : (
                    <ChatBox key={selectedChatId}>
                        <ChatHeader>
                            <ToggleSection onClick={() => setToggle(!toggle)}>
                                {toggle ? <FaAngleRight /> : <FaAngleLeft />}
                            </ToggleSection>
                            <ChatTitle>{"New Chat"}</ChatTitle>
                            <SlOptionsVertical />
                        </ChatHeader>

                        <ChatInput onSubmit={handleSendMessage}>
                            <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
                            {isLoading ? (
                                <button>
                                    <CircleSpinner size={20} color={"#131313"} />
                                </button>
                            ) : (
                                <button type="submit">
                                    <BiSend size={25} />
                                </button>
                            )}
                        </ChatInput>
                    </ChatBox>
                )}
            </AIChatContainer>
        </Wrapper>
    );
};

export default AiChat;
