import React, { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ChatRoutesContainer } from "./ChatElement";
import Sidebar from "./Sidebar/Sidebar";
import { Chat } from "../index";
import { useSelector } from "react-redux";
const ChatRoute = () => {
    const { user } = useSelector((state) => state.auth);
    const [ws, setWs] = useState(null);
    const [onlinePeople, setOnlinePeople] = useState({});
    // const [offlinePeople, setOfflinePeople] = useState({});
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [newMessageText, setNewMessageText] = useState("");
    const [messages, setMessages] = useState([]);
    const divUnderMessage = useRef();

    useEffect(() => {
        document.cookie = "Bearer " + user?.token + "; path=/";

        const newWs = new WebSocket("ws://localhost:5000/");
        setWs(newWs);

        newWs.addEventListener("open", () => {
            console.log("WebSocket connection opened");
        });

        newWs.addEventListener("message", handleMessages);

        return () => {
            newWs.close();
        };
    }, []);

    const showOnlinePeople = (peopleArray) => {
        const people = {};

        peopleArray.forEach(({ userId, username }) => {
            people[userId] = username;
        });
        setOnlinePeople(people);
    };
    const handleMessages = (ev) => {
        const messageData = JSON.parse(ev.data);
        if ("online" in messageData) {
            showOnlinePeople(messageData.online);
        } else {
            console.log("handleMessage", messageData);
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
        console.log(message);
        ws.send(JSON.stringify(message));
        // setNewMessageText('');
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

    const onlinePeopleExclOurUser = { ...onlinePeople };
    delete onlinePeopleExclOurUser[user._id];

    return (
        <ChatRoutesContainer>
            <Sidebar
                onlinePeople={onlinePeopleExclOurUser}
                selectedUserId={selectedUserId}
                setSelectedUserId={setSelectedUserId}
            />
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

export default ChatRoute;
