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
    // RouteLink,
    BiChatIcon,
} from "./SidebarElements";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDetails } from "../../../features/userDetail/userDetailSlice";
import { cdnContentImagesUrl } from "../../../features/apiUrl";
import { CgOpenCollective } from "react-icons/cg";

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
        { to: "/dashboard/chat", icon: <BiChatIcon />, label: "Community" },
        {
            to: "/dashboard/tools",
            icon: (
                <CgOpenCollective
                    style={{
                        fontSize: "1.6rem",
                    }}
                />
            ),
            label: "Tools",
        },
        { to: "/dashboard/blogs", icon: <BiLogoBloggericon />, label: "User Blogs" },
        { to: "/dashboard/bookmarks", icon: <BiBookmarksIcon />, label: "Bookmarks" },
        { to: "/dashboard/goals", icon: <BiLogoAlgoliaIcon />, label: "Goals" },
        { to: "/dashboard/settings/profile", icon: <CiSettingsIcon />, label: "Settings" },
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

            <section className={"heading"}>{isOpen && <p> Dashboard </p>}</section>

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
