import React, { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ChatRoutesContainer } from "./Chat/ChatElement";
import Sidebar from "./Sidebar/Sidebar";
import { Chat } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDetails, userDetailReset } from "../../features/userDetail/userDetailSlice";
import { getApiUrl, getApiUrlWs } from "../../features/apiUrl";
import axios from "axios";

const CommunityChat = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [ws, setWs] = useState(null);
    const [onlinePeople, setOnlinePeople] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [newMessageText, setNewMessageText] = useState("");
    const [messages, setMessages] = useState([]);
    const [hideSidebar, setHideSidebar] = useState(false);
    const divUnderMessage = useRef();
    const { userDetails, isUserDetailError, userDetailMessage } = useSelector((state) => state.userDetail);

    useEffect(() => {
        if (isUserDetailError) console.log(userDetailMessage);
        dispatch(getAllUserDetails());

        return () => {
            dispatch(userDetailReset());
        };
    }, [dispatch, isUserDetailError, userDetailMessage]);

    useEffect(() => {
        if (userDetails.length > 0) {
            connectToWs();
        }
    }, [userDetails]);

    const connectToWs = () => {
        const domain = process.env.NODE_ENV === "production" ? ".thecyberhub.org" : "localhost";
        document.cookie = `Bearer ${user?.token}; path=/; Secure; SameSite=None; domain=${domain}`;

        const newWs = new WebSocket(getApiUrlWs());
        setWs(newWs);

        newWs.addEventListener("open", () => {
            console.log("WebSocket connection opened");
        });

        newWs.addEventListener("message", handleMessages);
        newWs.addEventListener("close", () => {
            setTimeout(() => {
                console.log("WebSocket connection closed. Reconnecting...");
                connectToWs();
            }, 1000);
        });

        return () => {
            newWs.close();
        };
    };

    const showOnlinePeople = (peopleArray) => {
        const uniqueUserIds = new Set();
        const uniquePeopleArray = peopleArray.filter((person) => {
            if (!uniqueUserIds.has(person.userId)) {
                uniqueUserIds.add(person.userId);
                return true;
            }
            return false;
        });

        const onlinePeople = [];

        uniquePeopleArray.forEach((person) => {
            userDetails.forEach((userDetail) => {
                if (userDetail.user === person.userId) {
                    onlinePeople.push(userDetail);
                }
            });
        });
        setOnlinePeople(onlinePeople);
    };

    const handleMessages = (ev) => {
        const messageData = JSON.parse(ev.data);
        if ("online" in messageData) {
            showOnlinePeople(messageData.online);
        } else {
            setMessages((prev) => [
                ...prev,
                {
                    text: messageData.text,
                    sender: messageData.sender,
                    recipient: messageData.recipient,
                    isOur: true,
                },
            ]);
        }
    };

    const sendMessage = (ev) => {
        ev.preventDefault();
        const message = {
            recipient: selectedUserId,
            text: newMessageText,
        };
        ws.send(JSON.stringify(message));
        setNewMessageText("");
        setMessages((prev) => [
            ...prev,
            {
                text: newMessageText,
                recipient: selectedUserId,
                sender: user._id,
                isOur: true,
            },
        ]);
    };

    useEffect(() => {
        const div = divUnderMessage.current;
        if (div) {
            div.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [messages]);

    useEffect(() => {
        if (selectedUserId) {
            axios
                .get(getApiUrl(`api/chat/user/messages/${selectedUserId}`), {
                    headers: { Authorization: `Bearer ${user.token}` },
                })
                .then((res) => {
                    setMessages(res.data || []);
                });
        }
    }, [selectedUserId]);

    const onlinePeopleExclOurUser = onlinePeople.filter((person) => person.user !== user?._id);

    const offlinePeopleData = userDetails.filter((person) => {
        const foundOnlinePerson = onlinePeople.find((onlinePerson) => onlinePerson.user === person.user);
        return !foundOnlinePerson;
    });

    return (
        <ChatRoutesContainer>
            {hideSidebar ? null : (
                <Sidebar
                    hideSidebar={hideSidebar}
                    onlinePeople={onlinePeopleExclOurUser}
                    offlinePeople={offlinePeopleData}
                    selectedUserId={selectedUserId}
                    setSelectedUserId={setSelectedUserId}
                />
            )}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <Routes>
                    <Route
                        path={":id"}
                        element={
                            <Chat
                                userDetails={userDetails}
                                setHideSidebar={setHideSidebar}
                                hideSidebar={hideSidebar}
                                ws={ws}
                                selectedUserId={selectedUserId}
                                setNewMessageText={setNewMessageText}
                                messages={messages}
                                setMessages={setMessages}
                                newMessageText={newMessageText}
                                sendMessage={sendMessage}
                                divUnderMessage={divUnderMessage}
                            />
                        }
                    />
                    <Route path="*" element={<h1>Not found</h1>} />
                </Routes>
            </div>
        </ChatRoutesContainer>
    );
};
export default CommunityChat;
