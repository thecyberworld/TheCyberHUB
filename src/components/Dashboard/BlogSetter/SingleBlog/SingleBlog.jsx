import React from "react";
import { Wrapper } from "../../Profile/ProfileElements";
import ViewBlog from "../ViewBlog/ViewBlog";
import { ContainerSingleBlog } from "./SingleBlogElements";

const SingleBlog = () => {
    return (
        <Wrapper>
            <ContainerSingleBlog>
                <ViewBlog />
            </ContainerSingleBlog>
        </Wrapper>
    );
};

export default SingleBlog;
