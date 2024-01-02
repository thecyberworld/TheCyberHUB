import React, { useState, useEffect } from "react";
import axios from "axios";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { AIChatContainer, ChatHeader, ChatInput, ErrorMessage, ChatBox, ChatTitle } from "./AIChatElements";
import ChatMessages from "./ChatMessages";
import RecentChats from "./RecentChats";
import { useSelector } from "react-redux";
import { BiSend } from "react-icons/bi";
import { CircleSpinner } from "react-spinners-kit";
import { getApiUrl } from "../../features/apiUrl";

const API_BASE_URL = getApiUrl("api/aiChat");

const AiChat = () => {
    const { user } = useSelector((state) => state.auth);
    const [chats, setChats] = useState([]);

    const [userInput, setUserInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [selectedChat, setSelectedChat] = useState(null);
    const [selectedChatId, setSelectedChatId] = useState(null);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/ask/${selectedChat._id}`,
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
            setError("Failed to fetch AI response. Please try again.");
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
        } catch (error) {
            console.error(error);
        }
    };

    const handleNewChat = async () => {
        setIsLoading(true);
        setError(null);

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
            setSelectedChat(newChat);
        } catch (error) {
            setError("Failed to create a new chat. Please try again.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getMessages();
    }, []);

    return (
        <Wrapper>
            <AIChatContainer>
                <RecentChats chats={chats} setSelectedChatId={setSelectedChatId} onNewChat={handleNewChat} />
                <ChatBox>
                    {selectedChatId &&
                        chats.map(
                            (chat) =>
                                chat._id === selectedChatId && (
                                    <>
                                        <ChatHeader>
                                            <ChatTitle>{chat?.title}</ChatTitle>
                                        </ChatHeader>

                                        <ChatMessages messages={chat.messages} />
                                        {error && <ErrorMessage>{error}</ErrorMessage>}
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
                                    </>
                                ),
                        )}
                </ChatBox>
            </AIChatContainer>
        </Wrapper>
    );
};

export default AiChat;
