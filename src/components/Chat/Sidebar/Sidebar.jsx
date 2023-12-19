import React, { useState } from "react";
import {
    SidebarContainer,
    SidebarSection,
    RouteLink,
    SidebarTitle,
    ChannelList,
    ChannelItem,
    UserList,
    ExpandIcon,
} from "./SidebarElements";
import chatData from "../DummyChat/ChatData";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import Contact from "../Contact";

const Sidebar = ({ onlinePeople, offlinePeople, selectedUserId, setSelectedUserId }) => {
    const [showUsers, setShowUsers] = useState(true);

    const toggleUsers = () => {
        setShowUsers(!showUsers);
    };

    return (
        <SidebarContainer>
            <SidebarSection>
                <h2>Community Chat</h2>
            </SidebarSection>
            <SidebarSection>
                <SidebarTitle onClick={toggleUsers}>
                    Users
                    <ExpandIcon>{showUsers ? <FaSortUp /> : <FaSortDown />}</ExpandIcon>
                </SidebarTitle>
                {showUsers && (
                    <UserList>
                        {onlinePeople &&
                            Object.keys(onlinePeople).map((userId) => (
                                <RouteLink to={`/dashboard/chat/${userId}`} key={userId}>
                                    <Contact
                                        key={userId}
                                        id={userId}
                                        online={true}
                                        username={onlinePeople[userId]}
                                        onClick={() => {
                                            setSelectedUserId(userId);
                                            console.log({ userId });
                                        }}
                                        selected={userId === selectedUserId}
                                    />
                                </RouteLink>
                            ))}
                    </UserList>
                )}
            </SidebarSection>

            <SidebarSection>
                <SidebarTitle>Channels</SidebarTitle>
                <ChannelList>
                    {chatData.channels.map((channel) => (
                        <ChannelItem key={channel.id}>
                            <RouteLink to={`${channel.id}`}>{channel.channelname}</RouteLink>
                        </ChannelItem>
                    ))}
                </ChannelList>
            </SidebarSection>
        </SidebarContainer>
    );
};

export default Sidebar;
