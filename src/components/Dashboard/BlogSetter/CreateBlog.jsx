import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../../features/blogs/blogSlice";
import { Wrapper } from "../Profile/ProfileElements";
import { Link, useNavigate } from "react-router-dom";
import { reset } from "../../../features/goals/goalSlice";
import { CreateBlogContainer, AddImage, SectionCreateBlog } from "./CreateBlogElements";

const CreateBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { isSuccess, isError, message } = useSelector((state) => state.blogs);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        if (!user) {
            navigate("/login");
        }

        return () => {
            dispatch(reset());
        };
    }, [user, isError, message, isSuccess, navigate, dispatch]);

    const [blogData, setBlogData] = useState({
        title: "",
        content: "",
        tags: [],
    });

    const { title, content, tags } = blogData;

    const onChange = (e) => {
        setBlogData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));

        let value = e.target.value;
        if (e.target.name === "tags") {
            value = value.split(",").map((tag) => tag.trim()); // Split the string on comma and trim each tag
        }
        setBlogData((prevState) => ({
            ...prevState,
            [e.target.name]: value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const blogData = {
            title,
            content,
            tags,
        };

        dispatch(createBlog(blogData));
        setBlogData({
            title: "",
            content: "",
            tags: [],
        });
    };

    return (
        <Wrapper>
            <CreateBlogContainer>
                {isSuccess ? (
                    <>
                        <h1>Blog created successfully</h1>
                        <h2>
                            <Link to={"../blogs"} style={{ color: "cornflowerblue" }}>
                                {" "}
                                Visit
                            </Link>
                        </h2>
                    </>
                ) : null}
                <SectionCreateBlog>
                    <form onSubmit={onSubmit}>
                        <div className={"form-group"}>
                            <label style={{ color: "grey" }} htmlFor="addCoverImage">
                                {" "}
                                Add Cover Image <AddImage />{" "}
                            </label>
                            <input
                                type="file"
                                name="addCoverImage"
                                id="addCoverImage"
                                onChange={onChange}
                                style={{ display: "none" }}
                            />

                            <label style={{ color: "grey" }} htmlFor="title">
                                Title
                            </label>
                            <input
                                type="title"
                                name="title"
                                id="title"
                                value={title}
                                onChange={onChange}
                                placeholder="Enter your blog"
                            />

                            <label style={{ color: "grey" }} htmlFor="content">
                                Content
                            </label>
                            <textarea
                                type="content"
                                name="content"
                                id="content"
                                value={content}
                                onChange={onChange}
                                placeholder="Enter your content"
                            />

                            <label style={{ color: "grey" }} htmlFor="tags">
                                Tags
                            </label>
                            <input
                                type="text"
                                name="tags"
                                id="tags"
                                value={tags}
                                onChange={onChange}
                                placeholder="Enter a list of tags separated by comma (e.g. tag1, tag2, tag3)"
                            />
                        </div>

                        <div className="blog_form_group">
                            <button className={"btn btn-block"} type={"submit"}>
                                Add Blog
                            </button>
                        </div>
                    </form>
                </SectionCreateBlog>
            </CreateBlogContainer>
        </Wrapper>
    );
};

export default CreateBlog;
