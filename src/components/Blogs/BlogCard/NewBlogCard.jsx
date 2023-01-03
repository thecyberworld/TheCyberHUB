import React from "react";
import {
    Categories,
    Category,
    ContainerCard,
    Date,
    Description,
    DetailsSection,
    FooterDetailsSection,
    BlogImage,
    BlogImageSection,
    MainSection,
    SubSection,
    Title,
} from "./NewBlogCardElements";
import { RouterLink } from "../../Tools/ToolsElements";
import { encodeURL } from "../util";
import { Comments, Counts, Likes, Views } from "./BlogCardElements";
import { AiOutlineLike, AiTwotoneLike, CgEye, CgEyeAlt, MdModeComment, MdOutlineModeComment } from "react-icons/all";
const image = "https://user-images.githubusercontent.com/44284877/210166161-ad2f71a7-df74-43b9-8330-af9740d9e8ba.png";

const NewBlogCard = ({ blog }) => {
    const coverImage = blog?.coverImage;
    const coverImageUrl = `http://localhost:5000/images/${coverImage}`;
    const liked = true;
    const viewed = true;
    // const bookmarked = true;
    const commented = true;
    return (
        <ContainerCard>
            <MainSection>
                <SubSection>
                    <RouterLink to={{ pathname: `${encodeURL(blog.title)}` }}>
                        <Title> {blog.title} </Title>
                        <Description> {blog.content.slice(0, 100)} </Description>
                        <Date>
                            {" "}
                            by @{blog.username} {blog.createdAt}{" "}
                        </Date>
                    </RouterLink>
                </SubSection>
                <DetailsSection>
                    <BlogImageSection>
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
                <Counts>
                    <Comments> {commented ? <MdModeComment /> : <MdOutlineModeComment />} 10 </Comments>
                    <Likes> {liked ? <AiTwotoneLike /> : <AiOutlineLike />} 100 </Likes>
                    <Views> {viewed ? <CgEyeAlt /> : <CgEye />} 1000 </Views>
                </Counts>
            </FooterDetailsSection>
        </ContainerCard>
    );
};

export default NewBlogCard;
