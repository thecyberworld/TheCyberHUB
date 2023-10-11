import React, { useEffect, useState } from "react";
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
    BiSolidCircleIcon,
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

            {sidebarItems.map((item) => (
                <RouteLink key={item.to} to={item.to} isOpen={isOpen}>
                    {item.icon}
                    {isOpen && <SidebarTitle isOpen={isOpen}> {item.label} </SidebarTitle>}
                </RouteLink>
            ))}
        </DashboardSidebarContainer>
    );
};

export default Sidebar;
