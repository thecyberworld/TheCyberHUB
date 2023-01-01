import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import image from "../../../Blogs/img.webp";

import { encodeURL } from "../util";
// import {Tags, Tag} from "../BlogCardElements";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, updateBlog, reset } from "../../../../features/blogs/blogSlice";
import Spinner from "../../../MixComponents/Spinner/Spinner";
import { ContainerViewBlog, ViewBlogHeader } from "../ViewBlog/ViewBlogElements";
import { Wrapper } from "../../Profile/ProfileElements";

const EditBlog = () => {
    const dispatch = useDispatch();
    const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);
    const navigate = useNavigate();
    // const [editMode, setEditMode] = useState(true);
    const [blogData, setBlogData] = useState({
        title: "",
        content: "",
        tags: [],
    });

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
    const searchedBlog = blogs.find((blog) => encodeURL(blog.title).toLowerCase() === title.toLowerCase()) || {
        tags: [],
    };

    const onChange = (e) => {
        let value = e.target.value;
        if (e.target.name === "tags") {
            value = value.split(",").map((tag) => tag.trim());
        }
        setBlogData((prevState) => ({
            ...prevState,
            [e.target.name]: value,
        }));
    };
    const onSubmit = (e) => {
        e.preventDefault();

        const tagData = blogData.tags.length === 0 ? searchedBlog.tags : blogData.tags;

        const updatedBlogData = {
            title: blogData.title || searchedBlog.title,
            content: blogData.content || searchedBlog.content,
            tags: tagData,
        };

        dispatch(updateBlog({ id: searchedBlog._id, blogData: updatedBlogData }));
        // setEditMode(false);
        navigate("../");
    };

    return (
        <Wrapper>
            <ContainerViewBlog>
                <ViewBlogHeader>
                    {/* {!editMode ? ( */}
                    {/*    <> */}
                    {/*        <img src={image} alt="Blog Image"/> */}
                    {/*        <h1>{searchedBlog.title}</h1> */}
                    {/*        <h3>@{searchedBlog.username} | {searchedBlog.date}</h3> */}
                    {/*        <p>{searchedBlog.content}</p> */}
                    {/*    </> */}
                    {/* ) : ( */}
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={blogData.title || searchedBlog.title}
                                onChange={onChange}
                            />
                            <label htmlFor="content">Content</label>
                            <textarea
                                name="content"
                                id="content"
                                value={blogData.content || searchedBlog.content}
                                onChange={onChange}
                            />
                            <label htmlFor="tags">Tags</label>
                            <input
                                type="text"
                                name="tags"
                                id="tags"
                                value={blogData.tags.join(", ") || searchedBlog.tags.join(", ")}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Update Blog
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("../")}>
                                Cancel
                            </button>
                        </div>
                    </form>
                    {/* )} */}
                </ViewBlogHeader>
                {/* <Tags> */}
                {/*    {searchedBlog.tags.map((tag, index) => ( */}
                {/*        <Tag key={index}>{tag}</Tag> */}
                {/*    ))} */}
                {/* </Tags> */}
                {/* {!editMode ? ( */}
                {/*    <button className="btn btn-secondary" onClick={() => setEditMode(true)}> */}
                {/*        Edit this Blog */}
                {/*    </button> */}
                {/* ) : null} */}
            </ContainerViewBlog>
        </Wrapper>
    );
};

export default EditBlog;
