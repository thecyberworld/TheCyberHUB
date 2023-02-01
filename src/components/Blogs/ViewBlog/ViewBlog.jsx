import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { encodeURL } from "../util";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, reset } from "../../../features/blogs/blogSlice";
import {
    BlogImage,
    BlogImageContainer,
    BlogTitle,
    CommentContainer,
    ContainerViewBlog,
    ContentSection,
    Tag,
    TagsSection,
    UsernameAndDate,
    ViewBlogHeader,
} from "./ViewBlogElements";
import NotFound from "../../../NotFound";
import ViewComments from "../Comments/ViewComments";
import AddCommentForm from "../Comments/AddCommentForm";
import PreviewMarkdown from "./PreviewMarkdown";
import { CircleSpinner } from "react-spinners-kit";

const ViewBlog = () => {
    const { title } = useParams();

    const { user } = useSelector((state) => state.auth);
    const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            console.log(message);
        } else {
            dispatch(getAllBlogs());
        }
        return () => {
            dispatch(reset());
        };
    }, [dispatch, isError, message]);

    const blog = blogs.find((blog) => encodeURL(blog.title).toLowerCase() === title.toLowerCase());

    if (isLoading) return <CircleSpinner size={20} color={"#1fc10d"} />;
    if (!blog) return <NotFound />;

    const blogUnFormattedDate = new Date(blog?.createdAt);
    const blogCreatedAt = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(blogUnFormattedDate);

    const API_URL = "https://thecyberhub.nyc3.cdn.digitaloceanspaces.com/blog_images";
    const coverImage = blog?.coverImage;
    const coverImageUrl = `${API_URL}/${coverImage}`;

    return (
        <ContainerViewBlog>
            <ViewBlogHeader>
                <BlogImageContainer>
                    <BlogImage src={coverImageUrl} alt={coverImage} />
                </BlogImageContainer>
                <BlogTitle> {blog?.title} </BlogTitle>
                <UsernameAndDate>
                    @{blog?.username} | {blogCreatedAt}
                </UsernameAndDate>
                <ContentSection>
                    <PreviewMarkdown content={blog.content} />
                </ContentSection>
            </ViewBlogHeader>
            <TagsSection>
                {blog.tags.map((tag, id) => (
                    <Tag key={id}>{tag}</Tag>
                ))}
            </TagsSection>
            <CommentContainer>
                <ViewComments comments={blog?.comments} user={user} />
                <AddCommentForm blog_id={blog._id} />
            </CommentContainer>
        </ContainerViewBlog>
    );
};

export default ViewBlog;
