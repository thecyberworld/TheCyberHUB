import React, { useState } from "react";
import {
    DashboardSidebarContainer,
    RouteLink,
    SidebarTitle,
    ToggleButton,
    BiHomeCircleIcon,
    BiBookmarksIcon,
    BiLogoBloggericon,
    BiLogoAlgoliaIcon,
    CiSettingsIcon,
    BiSolidChevronLeftIcon,
    BiSolidChevronRighIcon,
    UserProfile,
    UserProfileDescription,
    BiSolidCircleIcon
} from "./SidebarElements";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const sidebarItems = [
        { to: "/", icon: <BiHomeCircleIcon />, label: "Home" },
        { to: "/dashboard/bookmarks", icon: <BiBookmarksIcon />, label: "Bookmarks" },
        { to: "/dashboard/blogs", icon: <BiLogoBloggericon />, label: "User Blogs" },
        { to: "/dashboard/goals", icon: <BiLogoAlgoliaIcon />, label: "Goals" },
        { to: "/dashboard/settings/profile", icon: <CiSettingsIcon />, label: "Settings" }
    ];

    return (
        <DashboardSidebarContainer isOpen={isOpen}>

            <UserProfile isOpen={isOpen}>
                <div className="user-profile-image">
                    <img src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80' alt="Profile Picture" />
                    <BiSolidCircleIcon />
                </div>
                <UserProfileDescription isOpen={isOpen}>
                    <h3>John Cena</h3>
                    <span>@johncena</span>
                </UserProfileDescription>

                <ToggleButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <BiSolidChevronLeftIcon /> : <BiSolidChevronRighIcon />}
                </ToggleButton>
            </UserProfile>


            <section className={"heading"}>
                <p> {isOpen && 'Dashboard'}</p>
            </section>

            {sidebarItems.map(item => (
                <RouteLink key={item.to} to={item.to} isOpen={isOpen}>
                    {item.icon}
                    {isOpen && <SidebarTitle isOpen={isOpen}> {item.label} </SidebarTitle>}
                </RouteLink>
            ))}
        </DashboardSidebarContainer>
    );
};

export default Sidebar;
