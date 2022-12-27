import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { encodeURL } from "../../../Blogs/util";
import { Tags, Tag } from "../BlogCardElements";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, reset } from "../../../../features/blogs/blogSlice";
import Spinner from "../../../MixComponents/Spinner/Spinner";
import { ContainerViewBlog, ViewBlogHeader } from "./ViewBlogElements";

const ViewBlog = () => {
    const dispatch = useDispatch();
    const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);

    const { title } = useParams();
    const searchedBlog = blogs.find((blog) => encodeURL(blog.title).toLowerCase() === title.toLowerCase());
    const coverImage = searchedBlog?.coverImage;

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        dispatch(getAllBlogs());
        return () => {
            dispatch(reset());
        };
    }, [dispatch, isError, message]);

    const coverImageUrl = `http://localhost:5000/images/blogImages/${coverImage}`;

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <ContainerViewBlog>
            <ViewBlogHeader>
                <img src={coverImageUrl} alt={coverImage} />
                <h1> {searchedBlog.title} </h1>
                <h3>
                    @{searchedBlog.username} | {searchedBlog.date}{" "}
                </h3>
                <p> {searchedBlog.content} </p>
            </ViewBlogHeader>
            <Tags>
                {searchedBlog.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                ))}
            </Tags>
        </ContainerViewBlog>
    );
};

export default ViewBlog;
