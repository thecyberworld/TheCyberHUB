import React from "react";
import { LoadingBlogContainer, LoadingContainer, LoadingLine } from "./LoadingBlogCardElements";
import {
    BlogImageSection,
    ContainerCard,
    Description,
    DetailsSection,
    MainSection,
    SubSection,
    Title,
} from "./NewBlogCardElements";
import { RouterLink } from "../../Beta/Tools/ToolsElements";

const LoadingAnimation = ({ height }) => {
    return (
        <LoadingContainer>
            <LoadingLine height={height} />
        </LoadingContainer>
    );
};

const LoadingBlogCard = () => {
    return (
        <ContainerCard>
            <LoadingBlogContainer>
                <MainSection>
                    <SubSection>
                        <RouterLink>
                            <Title>
                                {" "}
                                <LoadingAnimation height={12} />{" "}
                            </Title>
                            <Description>
                                {" "}
                                <LoadingAnimation height={10} />{" "}
                            </Description>
                            <Description>
                                {" "}
                                <LoadingAnimation height={10} />{" "}
                            </Description>
                        </RouterLink>
                    </SubSection>
                    <DetailsSection>
                        <BlogImageSection>
                            <LoadingAnimation height={150} />
                        </BlogImageSection>
                    </DetailsSection>
                </MainSection>
            </LoadingBlogContainer>
        </ContainerCard>
    );
};

export default LoadingBlogCard;
