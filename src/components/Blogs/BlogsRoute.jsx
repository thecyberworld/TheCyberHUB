import React from "react";
import { Route, Routes } from "react-router-dom";
import { Blogs, NotFound, SingleBlog } from "../index";

const BlogsRoute = () => {
    return (
        <Routes>
            <Route index element={<Blogs />} />
            <Route exact path={":title"} element={<SingleBlog />} />
            {/* <Route element={<NotFound/>}/> */}
            <Route path={"*"} element={<NotFound />} />
        </Routes>
    );
};

export default BlogsRoute;
