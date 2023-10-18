import React, { useEffect, useState } from "react";
import {
    DashboardSidebarContainer,
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
    BiSolidCircleIcon,
    SideBarLink,
    RouteLink,
    BiChatIcon,
} from "./SidebarElements";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDetails } from "../../../features/userDetail/userDetailSlice";
import { cdnContentImagesUrl } from "../../../features/apiUrl";

const Sidebar = () => {
    const dispatch = useDispatch();
    const { userDetails } = useSelector((state) => state.userDetail);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) dispatch(getAllUserDetails());
    }, [dispatch, user]);

    const userDetail = userDetails?.find((userDetail) => userDetail?.user === user?._id);
    const avatar = cdnContentImagesUrl("/user/" + (userDetail?.avatar || "avatarDummy.png"));

    const [isOpen, setIsOpen] = useState(true);

    const sidebarItems = [
        { to: "/", icon: <BiHomeCircleIcon />, label: "Home" },
        { to: "/dashboard/bookmarks", icon: <BiBookmarksIcon />, label: "Bookmarks" },
        { to: "/dashboard/blogs", icon: <BiLogoBloggericon />, label: "User Blogs" },
        { to: "/dashboard/goals", icon: <BiLogoAlgoliaIcon />, label: "Goals" },
        { to: "/dashboard/settings/profile", icon: <CiSettingsIcon />, label: "Settings" },
        { to: "/dashboard/chat", icon: <BiChatIcon />, label: "Community" },
    ];

    return (
        <DashboardSidebarContainer isOpen={isOpen}>
            <UserProfile isOpen={isOpen}>
                <div className="user-profile-image">
                    <img src={avatar} alt={userDetail?.username + " Profile Picture"} />
                    <BiSolidCircleIcon />
                </div>
                <UserProfileDescription isOpen={isOpen}>
                    <h3>{userDetail?.name}</h3>
                    <span>@{userDetail?.username}</span>
                </UserProfileDescription>

                <ToggleButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <BiSolidChevronLeftIcon /> : <BiSolidChevronRighIcon />}
                </ToggleButton>
            </UserProfile>

            <section className={"heading"}>
                <p> {isOpen && "Dashboard"}</p>
            </section>
            <RouteLink to={"/"}>
                <SidebarTitle> Home </SidebarTitle>
            </RouteLink>
            <RouteLink to={"/dashboard/bookmarks"}>
                <SidebarTitle> Bookmarks </SidebarTitle>
            </RouteLink>

            <RouteLink to={"/dashboard/blogs"}>
                <SidebarTitle> User Blogs </SidebarTitle>
            </RouteLink>

            <RouteLink to={"/dashboard/chat"}>
                <SidebarTitle> Community </SidebarTitle>
            </RouteLink>

            <RouteLink to={"/dashboard/goals"}>
                <SidebarTitle> Goals </SidebarTitle>
            </RouteLink>

            {/* <SidebarTitle> Analytics </SidebarTitle> */}
            {/* <SidebarTitle> Settings </SidebarTitle> */}
            {sidebarItems.map((item) => (
                <SideBarLink key={item.to} to={item.to} isOpen={isOpen}>
                    {item.icon}
                    {isOpen && <SidebarTitle isOpen={isOpen}> {item.label} </SidebarTitle>}
                </SideBarLink>
            ))}
        </DashboardSidebarContainer>
    );
};

export default Sidebar;
