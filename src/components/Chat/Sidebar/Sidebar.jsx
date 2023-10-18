import React from "react";
import { SidebarContainer, RouteLink, SidebarTitle } from "./SidebarElement";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import chatData from "../DummyChat/ChatData";

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <SidebarContainer>
            <section style={{ display: "flex", flexDirection: "row", margin: "0.2" }}>
                <h2>
                    <FaUserCircle />
                </h2>
                <h4>
                    {user.name}
                    <p>@{user.username}</p>
                </h4>
            </section>
            <br />

            {chatData.channels.map((channel) => (
                <RouteLink key={channel.id} to={`/chat/${channel.id}`}>
                    <SidebarTitle>
                        <FaCaretDown /> {channel.channelname}
                    </SidebarTitle>
                </RouteLink>
            ))}

            <RouteLink to={"/dashboard"}>
                <SidebarTitle>Back to Dashboard</SidebarTitle>
            </RouteLink>
        </SidebarContainer>
    );
};

export default Sidebar;
