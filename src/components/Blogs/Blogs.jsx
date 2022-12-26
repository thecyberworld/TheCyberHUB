import React from "react";
import { Link } from "react-router-dom";
import BlogCard from "../Dashboard/BlogSetter/BlogCard";
import blogs from "./BlogsData";
import { encodeURL } from "./util";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { AllBlogs } from "./BlogsElements";

const Blogs = () => {
    return (
        <Wrapper>
            <h1> Blogs </h1>
            <div style={{ display: "flex" }}>
                <AllBlogs>
                    {blogs.map((blog, id) => (
                        <Link key={id} className={"styles"} to={{ pathname: `${encodeURL(blog.title)}` }}>
                            <BlogCard
                                title={blog.title}
                                author={blog.author}
                                date={blog.date}
                                // content={blog.content}
                                tags={blog.tags}
                                key={blog.id}
                            />
                        </Link>
                    ))}
                </AllBlogs>
                {/* <BlogsSidebar/> */}
            </div>
        </Wrapper>
    );
};

export default Blogs;
