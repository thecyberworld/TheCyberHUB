import React from "react";
import { AllTags, Tag, TagsContainer } from "./FeedTagsElements";

const FeedTags = ({ tags, handleClick }) => {
    return (
        <TagsContainer>
            <h4
                style={{
                    color: "#eeeeee",
                    textAlign: "center",
                    marginBottom: "1rem",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                }}
            >
                Trending
            </h4>
            <AllTags>
                {tags.slice(0, 10).map(
                    (tag, key) =>
                        tag.length !== 0 && (
                            <Tag key={key} onClick={() => handleClick(tag)}>
                                {/* <RouterLink to={`tags/${tag.split(" ").join("-")}`}> */}
                                {tag}
                                {/* </RouterLink> */}
                            </Tag>
                        ),
                )}
            </AllTags>
        </TagsContainer>
    );
};

export default FeedTags;
