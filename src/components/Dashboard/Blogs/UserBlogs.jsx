import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, reset } from "../../../features/blogs/blogSlice";
import { Wrapper } from "../Profile/ProfileElements";
import NewBlogCard from "../../Blogs/BlogCard/NewBlogCard";
import { CircleSpinner } from "react-spinners-kit";

const UserBlogs = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        if (!user) navigate("/login");
        else dispatch(getBlogs());

        return () => dispatch(reset());
    }, [user, navigate, dispatch, isError, message]);

    if (isLoading) <CircleSpinner size={20} color={"#1fc10d"} />;

    return (
        <Wrapper>
            <Link to={"create"} style={{ color: "cornflowerblue" }}>
                <h2>Create a new blog</h2>
            </Link>
            {blogs && blogs?.length > 0 ? (
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                    {blogs.map((blog) => (
                        <NewBlogCard key={blog?._id} blog={blog} />
                    ))}
                </div>
            ) : (
                <h3> You have not set any blogs</h3>
            )}
        </Wrapper>
    );
};

export default UserBlogs;
