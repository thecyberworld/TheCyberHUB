import styled from "styled-components";

export const FeedOptionsMainContainer = styled.div`
    position: relative;
    padding: 5px;
    &:hover {
        transform: ${({ isOpen }) => !isOpen && "scale(1.1)"};
    }
    cursor: pointer;
`;
export const FeedOptionsContainer = styled.div`
    width: 200px;
    height: 160px;
    background-color: #0e0e0e;
    position: absolute;
    right: 10px;
    top: 25px;
    border-radius: 10px;
    border: 1px #3d3d3d solid;
    box-shadow: 2px 2px 10px #333333;
    padding: 20px 0;
`;
export const FeedOptionsList = styled.ul`
    padding: 15px 20px;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
`;
export const FeedOptionsItem = styled.li`
    &:hover {
        border-bottom: 0.5px #a1a1a1 solid;
        opacity: 0.7;
        transition: all 0.3s ease;
    }
    display: flex;
    justify-content: space-between;
`;
export const OptionLabel = styled.p`
    font-size: 20px;
    color: #a1a1a1;
`;
export const OptionButton = styled.button``;

export const FeedOptionsClose = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
`;
