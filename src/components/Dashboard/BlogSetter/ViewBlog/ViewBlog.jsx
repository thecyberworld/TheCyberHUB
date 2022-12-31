import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { encodeURL } from "../../../Blogs/util";
import { useDispatch, useSelector } from "react-redux";
import { Tag, Tags } from "../BlogCard/BlogCardElements";
import { addComment, getAllBlogs, reset } from "../../../../features/blogs/blogSlice";
import { CommentContainer, ContainerViewBlog, ContentReactMarkdown, ViewBlogHeader } from "./ViewBlogElements";
import Spinner from "../../../MixComponents/Spinner/Spinner";
import NotFound from "../../../../NotFound";
import ViewComments from "../Comments/ViewComments";
import AddCommentForm from "../Comments/AddCommentForm";

const ViewBlog = () => {
    const [addCommentData, setAddCommentData] = useState({
        comment: "",
    });

    const { comment } = addCommentData;
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);

    const { title } = useParams();
    const searchedBlog = blogs.find((blog) => encodeURL(blog.title).toLowerCase() === title.toLowerCase());
    const coverImage = searchedBlog?.coverImage;
    const coverImageUrl = `http://localhost:5000/images/blogImages/${coverImage}`;

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        dispatch(getAllBlogs());
        return () => {
            dispatch(reset());
        };
    }, [dispatch, isError, message]);

    if (!searchedBlog) {
        return <NotFound />;
    }

    if (isLoading) {
        return <Spinner />;
    }

    const blogUnFormattedDate = new Date(searchedBlog?.createdAt);
    const blogCreatedAt = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(blogUnFormattedDate);

    const comments = searchedBlog?.comments.map((comment) => ({
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
        dispatch(addComment({ blogId: searchedBlog._id, addCommentData }));
        setAddCommentData({
            comment: "",
        });
    };

    return (
        <ContainerViewBlog>
            <ViewBlogHeader>
                <img src={coverImageUrl} alt={coverImage} />
                <h1> {searchedBlog?.title} </h1>
                <h3>
                    @{searchedBlog?.username} | {blogCreatedAt}
                </h3>
                <ContentReactMarkdown>{searchedBlog?.content}</ContentReactMarkdown>
            </ViewBlogHeader>
            <Tags>
                {searchedBlog?.tags.map((tag, index) => (
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
