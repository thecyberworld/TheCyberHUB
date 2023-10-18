import React from "react";
import { SidebarContainer, RouteLink, SidebarTitle } from "./SidebarElement";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import chatData from "../DummyChat/ChatData";

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <SidebarContainer>
            <section style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                <h2>
                    <FaUserCircle />
                </h2>
                <span>
                    <b> {user.name} </b>
                    <p>@{user.username}</p>
                </span>
            </section>
            <br />

            <h3>Channels</h3>
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
                    <RouteLink key={channel.id} to={`/chat/${channel.id}`}>
                        <SidebarTitle> {channel.channelname} </SidebarTitle>
                    </RouteLink>
                ))}
            </div>

            <RouteLink to={"/dashboard"}>
                <h4>Back to Dashboard</h4>
            </RouteLink>
        </SidebarContainer>
    );
};

export default Sidebar;
