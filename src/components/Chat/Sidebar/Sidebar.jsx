import React, { useState } from "react";
import { SidebarContainer, SidebarSection, RouteLink, SidebarTitle, UserList, SidebarHeader } from "./SidebarElements";
import Contact from "../Contact";
import SearchInputBox from "../../Common/SearchInputBox";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const Sidebar = ({ hideSidebar, onlinePeople, offlinePeople, selectedUserId, setSelectedUserId }) => {
    const [showUsers, setShowUsers] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");

    const toggleUsers = () => {
        setShowUsers(!showUsers);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredOnlinePeople = onlinePeople?.filter((person) =>
        person.username.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const filteredOfflinePeople = offlinePeople?.filter((person) =>
        person.username.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <SidebarContainer hideSidebar={hideSidebar}>
            <SidebarHeader>
                <h2>Community Chat</h2>
            </SidebarHeader>
            <SearchInputBox
                placeholder={"Search users"}
                onChange={handleSearchChange}
                value={searchTerm}
                setValue={setSearchTerm}
            />
            <SidebarSection>
                <SidebarTitle onClick={toggleUsers}>Users {showUsers ? <FaAngleUp /> : <FaAngleDown />}</SidebarTitle>

                {!showUsers ? null : (
                    <UserList>
                        {filteredOnlinePeople &&
                            filteredOnlinePeople.map((person) => (
                                <RouteLink to={`/dashboard/chat/${person.user}`} key={person.user}>
                                    <Contact
                                        key={person.user}
                                        id={person.user}
                                        online={true}
                                        username={person.username.toLowerCase()}
                                        onClick={() => {
                                            setSelectedUserId(person.user);
                                        }}
                                        selected={person.user === selectedUserId}
                                    />
                                </RouteLink>
                            ))}
                        {filteredOfflinePeople &&
                            filteredOfflinePeople.map((person) => (
                                <RouteLink to={`/dashboard/chat/${person.user}`} key={person.user}>
                                    <Contact
                                        key={person.user}
                                        id={person.user}
                                        online={false}
                                        username={person.username.toLowerCase()}
                                        onClick={() => {
                                            setSelectedUserId(person.user);
                                        }}
                                        selected={person.user === selectedUserId}
                                    />
                                </RouteLink>
                            ))}
                    </UserList>
                )}
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
