import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, reset } from "../../../features/blogs/blogSlice";
import Spinner from "../../Other/MixComponents/Spinner/Spinner";
import { Wrapper } from "../Profile/ProfileElements";
import BlogCard from "../../Blogs/BlogCard/BlogCard";
const UserBlogs = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        if (!user) {
            navigate("/login");
        } else {
            dispatch(getBlogs());
        }

        return () => {
            dispatch(reset());
        };
    }, [user, navigate, dispatch, isError, message]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Wrapper>
            <Link to={"create"} style={{ color: "cornflowerblue" }}>
                <h2>Create a new blog</h2>
            </Link>

            <section className={"content"}>
                {blogs && blogs?.length > 0 ? (
                    <div className={"goals"}>
                        {blogs.map((blog) => (
                            <BlogCard key={blog?._id} blog={blog} />
                        ))}
                    </div>
                ) : (
                    <h3> You have not set any blogs</h3>
                )}
            </section>
        </Wrapper>
    );
};

export default UserBlogs;
