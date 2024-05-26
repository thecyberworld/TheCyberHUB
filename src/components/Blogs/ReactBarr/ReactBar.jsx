// ReactBar.jsx
import React from "react";
import { FaHeart, FaComment, FaBookmark, FaShare } from "react-icons/fa";
import styled from "styled-components";

// Styled Components
const SocialBarContainer = styled.div`
    color: black;
    position: fixed;
    bottom: 0;
    width: 20%;
    border-radius: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0 -2px 8px rgb(0 0 0 / 10%);
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;

    & span {
        margin-left: 5px;
    }

    & svg {
        width: 20px;
        height: 20px;
        color: #333;
    }

    &:hover svg {
        color: rgb(255 107 8);
    }
`;

// React Component
const ReactBar = () => {
    return (
        <SocialBarContainer>
            <IconContainer>
                <FaHeart />
                <span>10</span>
            </IconContainer>
            <IconContainer>
                <FaComment />
            </IconContainer>
            <IconContainer>
                <FaBookmark />
            </IconContainer>
            <IconContainer>
                <FaShare />
            </IconContainer>
        </SocialBarContainer>
    );
};

export default ReactBar;
