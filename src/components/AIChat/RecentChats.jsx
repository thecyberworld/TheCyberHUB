import React from "react";
import { RecentChatsContainer, RecentChatsHeader, RecentChatsList } from "./RecentChatsElements";
import { TbMessage2Plus } from "react-icons/tb";

const RecentChats = ({ chats, setSelectedChatId, onNewChat }) => {
    return (
        <RecentChatsContainer>
            <RecentChatsHeader>
                <h2>
                    {" "}
                    TheCyberChat {"{"}AI{"}"}{" "}
                </h2>
                <div className="new-chat-button" onClick={onNewChat}>
                    <TbMessage2Plus size={30} />
                </div>
            </RecentChatsHeader>

            {chats && chats.length > 0 ? (
                <RecentChatsList>
                    {[...chats].reverse().map((chat) => (
                        <li className="chat-title" key={chat._id} onClick={() => setSelectedChatId(chat._id)}>
                            {chat?.title}
                        </li>
                    ))}
                </RecentChatsList>
            ) : (
                <p>No recent chats. Start a new chat!</p>
            )}
        </RecentChatsContainer>
    );
};

export default RecentChats;
