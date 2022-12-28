import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { encodeURL } from "../../../Blogs/util";
import { Tags, Tag } from "../BlogCardElements";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getAllBlogs, reset } from "../../../../features/blogs/blogSlice";
import Spinner from "../../../MixComponents/Spinner/Spinner";
import {
    CommentContainer,
    CommentSection,
    ContainerViewBlog,
    ContentReactMarkdown,
    ReplySection,
    ViewBlogHeader,
} from "./ViewBlogElements";
import NotFound from "../../../../NotFound";

const ViewBlog = () => {
    const [addCommentData, setAddCommentData] = useState({
        comment: "",
    });

    const { comment } = addCommentData;

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
                {comments?.map((userComment, id) => (
                    <CommentSection key={id}>
                        {userComment?.comment}
                        {userComment?.replies.map((reply, id) => (
                            <ReplySection key={id}>{reply?.reply}</ReplySection>
                        ))}
                    </CommentSection>
                ))}

                <form onSubmit={handleSubmit} className={"form-group"}>
                    <label htmlFor="goal">Add Comment</label>
                    <input
                        type="text"
                        name="comment"
                        id={"comment"}
                        value={comment}
                        onChange={onChange}
                        placeholder="Add a comment"
                    />
                    <button className={"btn btn-block"} type="submit">
                        Submit
                    </button>
                </form>
            </CommentContainer>
        </ContainerViewBlog>
    );
};

export default ViewBlog;
