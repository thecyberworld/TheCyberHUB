import React from "react";
import image from "../../Blogs/img.webp";
import {
    BlogsContainer,
    BlogsContainerTitle,
    BottomSection,
    Counts,
    Tag,
    Tags,
    Bookmark,
    Comments,
    Likes,
    Views,
} from "./BlogCardElements";
import {
    AiOutlineLike,
    AiTwotoneLike,
    BsBookmarks,
    BsFillBookmarksFill,
    CgEye,
    CgEyeAlt,
    MdModeComment,
    MdOutlineModeComment,
} from "react-icons/all";

const BlogCard = ({ blog }) => {
    const liked = true;
    const viewed = true;
    const bookmarked = true;
    const commented = true;

    const date = new Date(blog.createdAt);
    const dateString = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);

    return (
        <BlogsContainer>
            <BlogsContainerTitle>
                <div className="blogImage-wrapper">
                    <img src={image} alt="Blog Image" width="100%" height="auto" />
                </div>
                <h3>{blog.title}</h3>
                <h6>
                    @{blog.username} • {dateString}
                </h6>
            </BlogsContainerTitle>
            {/* <div> */}
            {/*   {blog.content.slice(0, 200)} */}
            {/*   {blog.content.length > 200 ? "..." : ""} */}
            {/* </div> */}
            <BottomSection>
                <Bookmark> {bookmarked ? <BsFillBookmarksFill /> : <BsBookmarks />} </Bookmark>
                <Tags>
                    {blog.tags.slice(0, 2).map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                    ))}
                    {blog.tags.length > 2 ? <Tag>+{blog.tags.length - 2}</Tag> : null}
                </Tags>
                <Counts>
                    <Comments> {commented ? <MdModeComment /> : <MdOutlineModeComment />} 10 </Comments>
                    <Likes> {liked ? <AiTwotoneLike /> : <AiOutlineLike />} 100 </Likes>
                    <Views> {viewed ? <CgEyeAlt /> : <CgEye />} 1000 </Views>
                </Counts>
            </BottomSection>
        </BlogsContainer>
    );
};

export default BlogCard;
