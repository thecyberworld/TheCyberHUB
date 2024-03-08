import React from "react";
import {
    Categories,
    Category,
    ContainerTrendingBlogCard,
    Date,
    FooterDetailsSection,
    MainSection,
    SubSection,
    Title,
} from "src/components/Blogs/TrendingBlogs/TrendingBlogCardElements";
import { RouterLink } from "src/components/Tools/ToolsElements";
import { encodeURL } from "src/components/Blogs/util";

const TrendingBlogCard = ({ title, categories, username, timeString }) => {
    return (
        <ContainerTrendingBlogCard>
            <MainSection>
                <SubSection>
                    <RouterLink to={{ pathname: `${encodeURL(title)}` }}>
                        <Title> {title} </Title>
                    </RouterLink>
                </SubSection>
            </MainSection>
            <FooterDetailsSection>
                <Categories>
                    {categories.map((category, id) => (
                        <Category key={id}>{category}</Category>
                    ))}
                </Categories>

                <Date>
                    by @{username} {timeString}
                </Date>
            </FooterDetailsSection>
        </ContainerTrendingBlogCard>
    );
};

export default TrendingBlogCard;
