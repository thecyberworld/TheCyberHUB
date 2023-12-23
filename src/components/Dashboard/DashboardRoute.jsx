import React from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard, EditBlog, GoalSetter, NotFound, UserBlogs } from "../index";
import CreateBlogV2 from "../Blogs/ManageBlogs/CreateBlogV2/CreateBlogV2";
import DashboardSidebar from "./DashbaordSidebar/DashboardSidebar";
import { DashboardRoutesContainer } from "./DashboardElements";
import Bookmarks from "./Bookmarks/Bookmarks";
import NoteApp from "./Notetaker/NoteApp";
import Tools from "../Tools/Tools";
import CommunityChat from "../Chat/CommunityChat";

const DashboardRoute = () => {
    return (
        <DashboardRoutesContainer>
            <DashboardSidebar />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                }}
            >
                <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path={"goals"} element={<GoalSetter />} />
                    <Route path={"bookmarks"} element={<Bookmarks />} />
                    <Route path={"notes"} element={<NoteApp />} />
                    <Route path={"tools"} element={<Tools />} />
                    <Route path={"chat/*"} element={<CommunityChat />} />
                    <Route path={"blogs"}>
                        <Route index element={<UserBlogs />} />
                        <Route exact path={"create"} element={<CreateBlogV2 />} />
                        <Route exact path={"edit/:blogTitle"} element={<EditBlog />} />
                        <Route path={"*"} element={<NotFound />} />
                    </Route>

                    <Route path={"*"} element={<NotFound />} />
                </Routes>
            </div>
        </DashboardRoutesContainer>
    );
};

export default DashboardRoute;
