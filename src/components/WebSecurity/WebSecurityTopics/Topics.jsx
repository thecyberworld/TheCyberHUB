import React from "react";
import styled from "styled-components";
import { RouterLink } from "../../Tools/ToolsElements";
import topics from "./topicsData";
import Sidebar from "../Sidebar";
import { StyledTag } from "./TopicsElements";

// Styled component for the container
export const TopicsContainer = styled.div`
    width: 100%;
    max-width: 1500px;
    height: 100%;
    //background-color: #090909;
    display: flex;
    flex-direction: row;
    gap: 15px;
    margin: 5px auto;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const TopicCards = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 15px;
    width: 100%;
    justify-content: center;
`;

export const TopicCard = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    transition: all 0.3s ease-in-out;
    background: #131313;

    &:hover {
        transform: translateY(-5px);
        background: #1f0b02;
    }
`;

export const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Topics = () => {
    const handleSelectSubtopic = (subtopicId) => {
        console.log(subtopicId);
    };

    return (
        <TopicsContainer>
            <Sidebar heading={"Topics"} topics={topics} onSelectSubtopic={handleSelectSubtopic} onlyCat={true} />
            <Container>
                <TopicCards>
                    {topics.map((topic) => (
                        <RouterLink
                            to={`/websecurity/topic/${topic.id}`}
                            style={{ textDecoration: "none", width: "100%" }}
                            key={topic.id}
                        >
                            <TopicCard key={topic.id}>
                                <h3
                                    style={{
                                        marginBottom: "10px",
                                        color: "#77889a",
                                        fontSize: "1.2em",
                                    }}
                                >
                                    {topic.title}
                                </h3>
                                <Tags>
                                    {topic.tags.map((tag, index) => (
                                        <StyledTag key={index}>{tag}</StyledTag>
                                    ))}
                                </Tags>
                            </TopicCard>
                        </RouterLink>
                    ))}
                </TopicCards>
            </Container>
        </TopicsContainer>
    );
};

export default Topics;
