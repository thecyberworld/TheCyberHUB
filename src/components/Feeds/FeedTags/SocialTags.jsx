import React from "react";
import { AllTags, Tag, TagsContainer } from "./FeedTagsElements";

const SocialTags = ({ tags, handleClick }) => {
    return (
        <TagsContainer>
            <AllTags>
                {tags.slice(0, 10).map(
                    (tag, key) =>
                        tag.length !== 0 && (
                            <Tag key={key} onClick={() => handleClick(tag)}>
                                {tag}
                            </Tag>
                        ),
                )}
            </AllTags>
        </TagsContainer>
    );
};

export default SocialTags;
