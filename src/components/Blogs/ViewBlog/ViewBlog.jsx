import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { encodeURL } from "../util";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, reset } from "../../../features/blogs/blogSlice";
import { Helmet } from "react-helmet";

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

    if (!blog) return <NotFound />;
    console.log(blog?.createdAt);

    const blogUnFormattedDate = new Date(blog?.createdAt);
    const blogCreatedAt = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(blogUnFormattedDate);

    const API_URL = import.meta.env.VITE_CDN_URL;
    const coverImage = blog?.coverImage;
    const coverImageUrl = `${API_URL}/${coverImage}`;

    return (
        <>
            <Helmet>
                <meta property="og:title" content={blog?.title} />
                <meta property="og:description" content={blog?.description} />
                <meta property="og:image" content={coverImageUrl} />
                <meta property="og:url" content={`https://dev.thecyberhub.org/blogs/${encodeURL(blog?.title)}`} />
            </Helmet>
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
                        <PreviewMarkdown content={blog?.content} />
                    </ContentSection>
                </ViewBlogHeader>
                <TagsSection>
                    {blog?.tags.map((tag, id) => (
                        <Tag key={id}>{tag}</Tag>
                    ))}
                </TagsSection>
                <CommentContainer>
                    <ViewComments comments={blog?.comments} user={user} />
                    <AddCommentForm blog_id={blog?._id} isLoading={isLoading} />
                </CommentContainer>
            </ContainerViewBlog>
        </>
    );
};

export default ViewBlog;
