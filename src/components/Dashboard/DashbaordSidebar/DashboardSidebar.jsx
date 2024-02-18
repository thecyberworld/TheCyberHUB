import React from "react";
import {
    BiHomeCircleIcon,
    BiLogoAlgoliaIcon,
    BiChatIcon,
    CgOpenCollectiveIcon,
    PiNotebookDuotoneIcon,
    MdAnalyticsIcon,
    BiLogoBloggerIcon,
} from "./DashbaordSidebarElements";
import GeneralDashboardSidebar from "../../Common/GeneralDashboardSidebar";

const DashboardSidebar = ({ userDetail }) => {
    const sidebarItems = [
        { to: "/", icon: <BiHomeCircleIcon />, label: "Home" },
        { to: "/dashboard/analytics", icon: <MdAnalyticsIcon />, label: "Analytics" },
        { to: "/dashboard/chat", icon: <BiChatIcon />, label: "Chat" },
        // { to: "/dashboard/tasks", icon: <BsClipboardCheckIcon  />, label: "Tasks" },
        { to: "/dashboard/notes", icon: <PiNotebookDuotoneIcon />, label: "Notes" },
        { to: "/dashboard/goals", icon: <BiLogoAlgoliaIcon />, label: "Goals" },
        { to: "/dashboard/tools", icon: <CgOpenCollectiveIcon />, label: "Tools" },
        { to: "/dashboard/blogs", icon: <BiLogoBloggerIcon />, label: "User Blogs" },
        // {to: "/dashboard/bookmarks", icon: <BiBookmarksIcon/>, label: "Bookmarks"},
        // { to: "/settings/profile", icon: <CiSettingsIcon />, label: "Settings" },
    ];

    return <GeneralDashboardSidebar userDetail={userDetail} sidebarItems={sidebarItems} />;
};

export default DashboardSidebar;
