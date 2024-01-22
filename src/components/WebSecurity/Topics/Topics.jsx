import React from "react";
import { StyledTag, StyledTopicCard, StyledTopicsContainer } from "./TopicsElements";
import { RouterLink } from "../../Tools/ToolsElements";
import topics from "./topicsData";

const Topics = () => {
    return (
        <StyledTopicsContainer>
            {topics.map((topic) => (
                <RouterLink to={`/websecurity/topic/${topic.id}`} style={{ textDecoration: "none" }} key={topic.id}>
                    <StyledTopicCard key={topic.id}>
                        <h3 style={{ marginBottom: "10px", color: "#ecf0f1" }}>{topic.title}</h3>
                        <p style={{ marginBottom: "10px", fontSize: "0.9em", color: "#ecf0f1" }}>
                            Level: {topic.level}
                        </p>
                        <p style={{ marginBottom: "10px", fontSize: "0.9em", color: "#ecf0f1" }}>
                            Category: {topic.category}
                        </p>
                        <p style={{ marginBottom: "10px", fontSize: "0.9em", color: "#ecf0f1" }}>
                            Tags:{" "}
                            {topic.tags.map((tag, index) => (
                                <StyledTag key={index}>{tag}</StyledTag>
                            ))}
                        </p>
                    </StyledTopicCard>
                </RouterLink>
            ))}
        </StyledTopicsContainer>
    );
};

export default Topics;
