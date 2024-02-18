import React from "react";
import {
    BlogCardImage,
    BlogImageSection,
    ButtonDelete,
    ButtonEdit, // ButtonDelete,
    // ButtonEdit,
    Categories,
    Category,
    ContainerCard, // Description,
    DetailsSection,
    EditBlogSection, // EditBlogSection,
    FooterDetailsSection,
    MainSection,
    SubSection,
    Title,
    Username,
} from "./BlogCardElements";
import { RouterLink } from "../../Tools/ToolsElements";
import { encodeURL } from "../util";
// import { AiFillDelete } from "react-icons/ai";
// import { BiEdit } from "react-icons/bi";
// import { deleteBlog } from "../../../features/blogs/blogSlice";
// import { Link, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { cdnContentImagesUrl } from "../../../features/apiUrl";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { deleteBlog } from "../../../features/blogs/blogSlice";
import { AiFillDelete } from "react-icons/ai";

const image = "https://user-images.githubusercontent.com/44284877/210166161-ad2f71a7-df74-43b9-8330-af9740d9e8ba.png";

const BlogCard = ({ blog }) => {
    const pathname = window.location.pathname;
    const isDashboard = pathname.split("/")[1] === "dashboard";
    const dispatch = useDispatch();
    const coverImage = blog?.coverImage;
    const coverImageUrl = cdnContentImagesUrl(`/blog/${coverImage}`) || image;
    const { user } = useSelector((state) => state.auth);

    return (
        <ContainerCard>
            <span>
                {isDashboard && user && user._id === blog?.user ? (
                    <EditBlogSection>
                        <ButtonDelete onClick={() => dispatch(deleteBlog(blog?._id))} style={{ padding: "2px 10px" }}>
                            <AiFillDelete size={25} /> Delete
                        </ButtonDelete>
                        <Link key={blog?._id} to={{ pathname: `edit/${encodeURL(blog?.title)}` }}>
                            <ButtonEdit style={{ padding: "2px 10px" }}>
                                <BiEdit size={25} /> Edit
                            </ButtonEdit>
                        </Link>
                    </EditBlogSection>
                ) : null}
                <DetailsSection>
                    <BlogImageSection>
                        <RouterLink to={{ pathname: `/blogs/${encodeURL(blog?.title)}` }}>
                            <BlogCardImage src={coverImageUrl || image} alt={""} />
                        </RouterLink>
                    </BlogImageSection>
                </DetailsSection>
                <MainSection>
                    <SubSection>
                        <RouterLink to={{ pathname: `/blogs/${encodeURL(blog?.title)}` }}>
                            <Title> {blog?.title} </Title>
                            {/* <Description> {blog?.content.slice(0, 125)} </Description> */}
                        </RouterLink>
                    </SubSection>
                </MainSection>
            </span>
            <FooterDetailsSection>
                <Categories>
                    {blog?.tags
                        .slice(0, 3)
                        .map((tag, id) => (tag.length !== 0 ? <Category key={id}>{tag.slice(0, 30)}</Category> : null))}

                    {blog?.tags.length > 3 ? <Category>+ {blog?.tags.length - 3}</Category> : null}
                </Categories>
                <Username> @{blog?.username}</Username>
            </FooterDetailsSection>
        </ContainerCard>
    );
};

export default BlogCard;
