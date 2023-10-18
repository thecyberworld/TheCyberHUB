import React from "react";
import { SidebarContainer, RouteLink, SidebarTitle } from "./SidebarElement";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useSelector } from "react-redux";

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

            <RouteLink>
                <SidebarTitle>
                    <FaCaretDown /> Announcement
                </SidebarTitle>
            </RouteLink>
            <RouteLink>
                <SidebarTitle>
                    <FaCaretDown /> Support
                </SidebarTitle>
            </RouteLink>

            <RouteLink>
                <SidebarTitle>
                    <FaCaretDown /> Help
                </SidebarTitle>
            </RouteLink>

            <RouteLink>
                <SidebarTitle>
                    <FaCaretDown /> Security
                </SidebarTitle>
            </RouteLink>

            <RouteLink>
                <SidebarTitle>
                    <FaCaretDown /> Pro-Player Only
                </SidebarTitle>
            </RouteLink>

            <RouteLink to={"/dashboard"}>
                <SidebarTitle>Back to Dashboard</SidebarTitle>
            </RouteLink>
        </SidebarContainer>
    );
};

export default Sidebar;
