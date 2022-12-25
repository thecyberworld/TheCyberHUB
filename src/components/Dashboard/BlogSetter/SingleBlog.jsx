import React from "react";
import { Wrapper } from "../Profile/ProfileElements";
import LeftBlogSidebar from "../../Blogs/BlogSidebar/LeftBlogSidebar";
import RightBlogSidebar from "../../Blogs/BlogSidebar/RightBlogSidebar";

const SingleBlog = () => {
    return (
        <Wrapper>
            <LeftBlogSidebar />

            <RightBlogSidebar />
        </Wrapper>
    );
};

export default SingleBlog;
