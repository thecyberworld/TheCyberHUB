import React from "react";
import { DashboardItemsContainer, DashboardItemsLink } from "./DashboardElements";

const DashboardItems = () => {
    return (
        <DashboardItemsContainer>
            <DashboardItemsLink to={"/dashboard/blogs"}>Blogs</DashboardItemsLink>
            <DashboardItemsLink to={"/dashboard/goals"}>Goals</DashboardItemsLink>
        </DashboardItemsContainer>
    );
};

export default DashboardItems;
