import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, reset } from "../../features/blogs/blogSlice";
import Spinner from "../Other/MixComponents/Spinner/Spinner";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
// import BlogCard from "./BlogCard/BlogCard";
import { AllBlogs, BlogsComponent, MiddleContainer } from "./BlogsElements";
// import RightBlogSidebar from "./BlogSidebar/RightBlogSidebar";
// import LeftBlogSidebar from "./BlogSidebar/LeftBlogSidebar";
import TrendingBlogs from "./TrendingBlogs/TrendingBlogs";
import NewBlogCard from "./BlogCard/NewBlogCard";
import LeftBlogSidebar from "./BlogSidebar/LeftBlogSidebar";
import { RouterButtonLink } from "./ManageBlogs/CreateBlog/CreateBlogElements";

const Blogs = () => {
    const dispatch = useDispatch();
    const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);

    useEffect(() => {
        if (isError) console.log(message);

        dispatch(getAllBlogs());

        return () => dispatch(reset());
    }, [dispatch, isError, message]);

    if (isLoading) return <Spinner />;

    return (
        <Wrapper>
            <RouterButtonLink to={"/dashboard/blogs/create"}> Create Blog </RouterButtonLink>
            <br />
            <BlogsComponent>
                <LeftBlogSidebar />
                <MiddleContainer>
                    {blogs && blogs?.length > 0 ? (
                        <AllBlogs>
                            {blogs.map((blog) => (
                                <NewBlogCard key={blog?._id} blog={blog} />
                            ))}
                        </AllBlogs>
                    ) : (
                        <>
                            <h3>There are no blogs to display</h3>
                        </>
                    )}
                </MiddleContainer>
                <TrendingBlogs />
            </BlogsComponent>
        </Wrapper>
    );
};

export default Blogs;
