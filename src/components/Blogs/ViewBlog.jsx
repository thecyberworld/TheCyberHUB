import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import image from "./img.webp";

import { encodeURL } from "./util";
import { ViewBlogComponent } from "./BlogElements";
import { Tags, Tag } from "../Dashboard/BlogSetter/BlogCardElements";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, reset } from "../../features/blogs/blogSlice";
import Spinner from "../MixComponents/Spinner/Spinner";

const ViewBlog = () => {
    const dispatch = useDispatch();
    const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        dispatch(getAllBlogs());

        return () => {
            dispatch(reset());
        };
    }, [dispatch, isError, message]);

    if (isLoading) {
        return <Spinner />;
    }

    const { title } = useParams();
    const searchedBlog = blogs.find((blog) => encodeURL(blog.title).toLowerCase() === title.toLowerCase());
    return (
        <>
            <ViewBlogComponent>
                <img className="viewImg" src={image} alt="Blog Image" />
                <h1>{searchedBlog.title}</h1>
                <h3>
                    @{searchedBlog.username} | {searchedBlog.date}
                </h3>
                <p>{searchedBlog.content}</p>
            </ViewBlogComponent>
            <Tags>
                {searchedBlog.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                ))}
            </Tags>
        </>
    );
};

export default ViewBlog;
