import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { EditBlog, GoalSetter, NotFound, UserBlogs } from "src/components/index";
import CreateBlogV2 from "src/components/Blogs/ManageBlogs/CreateBlogV2/CreateBlogV2";
import DashboardSidebar from "./DashbaordSidebar/DashboardSidebar";
import { DashboardRoutesContainer } from "./DashboardElements";
import Bookmarks from "./Bookmarks/Bookmarks";
import NoteApp from "./Notetaker/NoteApp";
import Tools from "src/components/Tools/Tools";
import CommunityChat from "src/components/Chat/CommunityChat";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDetails } from "src/features/userDetail/userDetailSlice";
import Analytics from "./Analytics/Analytics";

const DashboardRoute = () => {
    const dispatch = useDispatch();
    const { userDetails } = useSelector((state) => state.userDetail);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
        // setTimeout(() => {
        //     setIsLoading(false);
        // }, 1000);
    }, [user, navigate]);

    useEffect(() => {
        if (user) dispatch(getAllUserDetails());
    }, [dispatch, user]);

    const userDetail = userDetails?.find((userDetail) => userDetail?.user === user?._id);

    return (
        <DashboardRoutesContainer>
            <DashboardSidebar userDetail={userDetail} />
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
                    <Route index element={<Analytics />} />
                    <Route path={"analytics"} element={<Analytics />} />
                    <Route path={"goals"} element={<GoalSetter />} />
                    <Route path={"bookmarks"} element={<Bookmarks />} />
                    <Route path={"notes"} element={<NoteApp />} />
                    <Route path={"tools"} element={<Tools />} />
                    <Route path={"chat/*"} element={<CommunityChat userDetails={userDetails} />} />
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
