import React from "react";
import { SidebarContainer, RouteLink, SidebarTitle } from "./SidebarElement";
import chatData from "../DummyChat/ChatData";

const Sidebar = () => {
    return (
        <SidebarContainer>
            <h2>Community Chat</h2>

            <h4>Channels</h4>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                }}
            >
                {chatData.channels.map((channel) => (
                    <RouteLink key={channel.id} to={`${channel.id}`}>
                        <SidebarTitle> {channel.channelname} </SidebarTitle>
                    </RouteLink>
                ))}
            </div>
        </SidebarContainer>
    );
};

export default Sidebar;
