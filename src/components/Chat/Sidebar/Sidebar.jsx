import React, { useState } from "react";
import { SidebarContainer, SidebarSection, RouteLink, SidebarTitle, UserList, SidebarHeader } from "./SidebarElements";
import Contact from "../Contact";

const Sidebar = ({ hideSidebar, onlinePeople, selectedUserId, setSelectedUserId }) => {
    const [showUsers, setShowUsers] = useState(true);

    const toggleUsers = () => {
        setShowUsers(!showUsers);
    };

    return (
        <SidebarContainer hideSidebar={hideSidebar}>
            <SidebarHeader>
                <h2>Community Chat</h2>
            </SidebarHeader>
            <SidebarSection>
                <SidebarTitle onClick={toggleUsers}>
                    Users
                    {/* <ExpandIcon>{showUsers ? <FaSortUp /> : <FaSortDown />}</ExpandIcon> */}
                </SidebarTitle>
                {/* {showUsers && ( */}
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
                                    }}
                                    selected={userId === selectedUserId}
                                />
                            </RouteLink>
                        ))}
                </UserList>
                {/* )} */}
            </SidebarSection>

            {/* <SidebarSection> */}
            {/*    <SidebarTitle>Channels</SidebarTitle> */}
            {/*    <ChannelList> */}
            {/*        {chatData.channels.map((channel) => ( */}
            {/*            <ChannelItem key={channel.id}> */}
            {/*                <RouteLink to={`${channel.id}`}>{channel.channelname}</RouteLink> */}
            {/*            </ChannelItem> */}
            {/*        ))} */}
            {/*    </ChannelList> */}
            {/* </SidebarSection> */}
        </SidebarContainer>
    );
};

export default Sidebar;
