import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FeedOptionsContainer } from "./FeedOptionsElements";

const FeedOptions = () => {
    const handleClickEvent = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };
    return (
        <FeedOptionsContainer onClick={handleClickEvent}>
            <BsThreeDotsVertical />
        </FeedOptionsContainer>
    );
};
export default FeedOptions;
