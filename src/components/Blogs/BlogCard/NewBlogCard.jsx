import React from "react";
import {
    BlogImage,
    BlogImageSection,
    Categories,
    Category,
    ContainerCard,
    Date,
    Description,
    DetailsSection,
    EditBlogSection,
    FooterDetailsSection,
    MainSection,
    SubSection,
    Title,
} from "./NewBlogCardElements";
import { RouterLink } from "../../Beta/Tools/ToolsElements";
import { encodeURL } from "../util";
// import {Comments, Counts, Likes, Views} from "./BlogCardElements";
import { AiFillDelete, BiEdit } from "react-icons/all";
import { deleteBlog } from "../../../features/blogs/blogSlice";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const image = "https://user-images.githubusercontent.com/44284877/210166161-ad2f71a7-df74-43b9-8330-af9740d9e8ba.png";

const API_URL = import.meta.env.VITE_CDN_URL;

const NewBlogCard = ({ blog }) => {
    const coverImage = blog?.coverImage;
    const coverImageUrl = `${API_URL}/${coverImage}` || image;
    // const liked = true;
    // const viewed = true;
    // const bookmarked = true;
    // const commented = true;
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { pathname } = useLocation();
    return (
        <ContainerCard>
            <MainSection>
                <SubSection>
                    <RouterLink to={{ pathname: `${encodeURL(blog.title)}` }}>
                        <Title> {blog.title} </Title>
                        <Description> {blog.content.slice(0, 100)} </Description>
                    </RouterLink>
                </SubSection>
                <DetailsSection>
                    <BlogImageSection>
                        <EditBlogSection>
                            {pathname !== "/blogs" && user && user._id === blog.user ? (
                                <Link key={blog._id} to={{ pathname: `edit/${encodeURL(blog.title)}` }}>
                                    <button style={{ padding: "2px 10px" }}>
                                        <BiEdit />
                                    </button>
                                </Link>
                            ) : null}
                            {pathname !== "/blogs" && user && user._id === blog.user ? (
                                <button onClick={() => dispatch(deleteBlog(blog?._id))} style={{ padding: "2px 10px" }}>
                                    <AiFillDelete />
                                </button>
                            ) : null}
                        </EditBlogSection>
                        <BlogImage src={coverImageUrl || image} alt={blog.coverImage} width="100%" height="auto" />
                    </BlogImageSection>
                </DetailsSection>
            </MainSection>
            <FooterDetailsSection>
                <Categories>
                    {blog.tags.map((tag, id) => (
                        <Category key={id}>{tag}</Category>
                    ))}
                </Categories>
                <Date>
                    @{blog.username} | {blog.createdAt}
                </Date>
                {/* <Counts> */}
                {/*    <Comments> {commented ? <MdModeComment/> : <MdOutlineModeComment/>} 10 </Comments> */}
                {/*    <Likes> {liked ? <AiTwotoneLike/> : <AiOutlineLike/>} 100 </Likes> */}
                {/*    <Views> {viewed ? <CgEyeAlt/> : <CgEye/>} 1000 </Views> */}
                {/* </Counts> */}
            </FooterDetailsSection>
        </ContainerCard>
    );
};

export default NewBlogCard;
