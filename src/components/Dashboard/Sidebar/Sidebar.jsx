import React, { useEffect, useState } from "react";
import {
    DashboardSidebarContainer,
    SidebarTitle,
    // ToggleButton,
    BiHomeCircleIcon,
    // BiBookmarksIcon,
    BiLogoBloggericon,
    BiLogoAlgoliaIcon,
    CiSettingsIcon,
    BiSolidChevronLeftIcon,
    BiSolidChevronRighIcon,
    UserProfile,
    UserProfileDescription,
    BiSolidCircleIcon,
    SideBarLink,
    BiChatIcon,
    SideBarLinkContainer,
    CgOpenCollectiveIcon,
    PiNotebookDuotoneIcon,
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
        { to: "/dashboard/notes", icon: <PiNotebookDuotoneIcon />, label: "Notes" },
        { to: "/dashboard/goals", icon: <BiLogoAlgoliaIcon />, label: "Goals" },
        { to: "/dashboard/tools", icon: <CgOpenCollectiveIcon />, label: "Tools" },
        { to: "/dashboard/blogs", icon: <BiLogoBloggericon />, label: "User Blogs" },
        // {to: "/dashboard/bookmarks", icon: <BiBookmarksIcon/>, label: "Bookmarks"},
        { to: "/dashboard/chat", icon: <BiChatIcon />, label: "Community" },
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
                    <h4>{userDetail?.name}</h4>
                    <span>@{userDetail?.username}</span>
                </UserProfileDescription>
            </UserProfile>

            {/* <section className={"heading"}>{isOpen ? <p> Dashboard </p> : ""}</section> */}

            <SideBarLinkContainer isOpen={isOpen}>
                {sidebarItems.map((item) => (
                    <SideBarLink key={item.to} to={item.to} isOpen={isOpen}>
                        {item.icon}
                        {isOpen && <SidebarTitle isOpen={isOpen}> {item.label} </SidebarTitle>}
                    </SideBarLink>
                ))}
            </SideBarLinkContainer>

            <SideBarLink
                style={{
                    height: "50px",
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    backgroundColor: "#2a2a2a",
                    display: "flex",
                    borderRadius: "0",
                    color: "#f5f5f5",
                }}
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                    <>
                        <BiSolidChevronLeftIcon />
                        <SidebarTitle isOpen={isOpen}> Collapse </SidebarTitle>{" "}
                    </>
                ) : (
                    <BiSolidChevronRighIcon />
                )}
            </SideBarLink>
        </DashboardSidebarContainer>
    );
};

export default Sidebar;
