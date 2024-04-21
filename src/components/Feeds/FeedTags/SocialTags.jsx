import React from "react";
import { AllTags, Tag, TagsContainer } from "./FeedTagsElements";

const SocialTags = ({ tags, handleClick, searchTerm, selectedTags, setSelectedTags }) => {
    const handleTagSelection = (tag) => {
        if (selectedTags.includes(tag) || searchTerm.includes(tag)) {
            setSelectedTags(selectedTags.filter((item) => item !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
        handleClick(tag);
    };
    return (
        <TagsContainer>
            <AllTags>
                {tags.slice(0, 10).map(
                    (tag, key) =>
                        tag.length !== 0 && (
                            <Tag
                                style={{
                                    background: selectedTags.includes(tag) ? "#FF6B08" : "#1a1a1a",
                                    color: selectedTags.includes(tag) ? "#0A0A0A" : "",
                                }}
                                key={key}
                                onClick={() => {
                                    handleTagSelection(tag);
                                }}
                            >
                                {tag}
                            </Tag>
                        ),
                )}
            </AllTags>
        </TagsContainer>
    );
};
export default SocialTags;
