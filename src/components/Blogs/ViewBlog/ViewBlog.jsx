import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { encodeURL } from "../util";
import { useDispatch, useSelector } from "react-redux";
import { Tag, Tags } from "../BlogCard/BlogCardElements";
import { addComment, getAllBlogs, reset } from "../../../features/blogs/blogSlice";
import {
    CommentContainer,
    ContainerViewBlog,
    ContentReactMarkdown,
    ContentSection,
    ViewBlogHeader,
} from "./ViewBlogElements";
import Spinner from "../../Other/MixComponents/Spinner/Spinner";
import NotFound from "../../../NotFound";
import ViewComments from "../Comments/ViewComments";
import AddCommentForm from "../Comments/AddCommentForm";
import remarkGfm from "remark-gfm";

const ViewBlog = () => {
    const [addCommentData, setAddCommentData] = useState({
        comment: "",
    });

    const { comment } = addCommentData;
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);

    const { title } = useParams();
    const blog = blogs.find((blog) => encodeURL(blog.title).toLowerCase() === title.toLowerCase());
    const coverImage = blog?.coverImage;
    const coverImageUrl = `http://localhost:5000/images/${coverImage}`;

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        dispatch(getAllBlogs());
        return () => {
            dispatch(reset());
        };
    }, [dispatch, isError, message]);

    if (!blog) {
        return <NotFound />;
    }

    if (isLoading) {
        return <Spinner />;
    }

    const blogUnFormattedDate = new Date(blog?.createdAt);
    const blogCreatedAt = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(blogUnFormattedDate);

    const comments = blog?.comments.map((comment) => ({
        id: comment?._id,
        username: comment?.username,
        comment: comment?.comment,
        replies: comment?.replies,
    }));

    const onChange = (e) => {
        setAddCommentData({
            ...addCommentData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const addCommentData = {
            comment,
        };
        dispatch(addComment({ blogId: blog._id, addCommentData }));
        setAddCommentData({
            comment: "",
        });
    };
    return (
        <ContainerViewBlog>
            <ViewBlogHeader>
                <img src={coverImageUrl} alt={coverImage} />
                <h1> {blog?.title} </h1>
                <h3>
                    @{blog?.username} | {blogCreatedAt}
                </h3>
                <ContentSection>
                    <ContentReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h2: "h1",
                        }}
                    >
                        {blog?.content}
                    </ContentReactMarkdown>
                </ContentSection>
            </ViewBlogHeader>
            <Tags>
                {blog?.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                ))}
            </Tags>

            <CommentContainer>
                <ViewComments comments={comments} user={user} />
                <AddCommentForm comment={comment} onChange={onChange} handleSubmit={handleSubmit} />
            </CommentContainer>
        </ContainerViewBlog>
    );
};

export default ViewBlog;
