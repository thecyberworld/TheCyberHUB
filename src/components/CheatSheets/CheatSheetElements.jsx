import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";

export const LeftSection = styled.div`
    min-width: 250px;
    max-width: 300px;
    width: 100%;
    flex: 1;

    @media (width <= 800px) {
        max-width: 100%;
    }
`;

export const HackBookContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    height: 100%;
    max-width: 1500px;

    @media (width <= 800px) {
        /* Adjust styles for smaller screens */
        flex-direction: column;
        max-width: 100%;
    }
`;

export const HackBookTitle = styled.h1`
    display: flex;
    width: 100%;
    font-size: 24px;
    text-align: center;
    margin-top: 7.5px;
    place-content: center center;
    font-family: Poppins, sans-serif;

    @media (width <= 800px) {
        width: 95%;
    }
`;

export const HackBookHeading = styled.p`
    font-size: 16px;
    font-weight: 600;
    padding: 5px 10px;
    text-align: start;
    place-content: center center;
`;

export const ContentNavData = styled.div`
    display: flex;
    border-radius: 5px;
    flex-direction: column;
    width: 100%;

    /* gap: 5px; */
    overflow: hidden auto;
    max-height: 75vh;
    height: 100%;

    &::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
`;

export const ContentNav = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 100%;
    padding: 0 0 5px;
    background: #0a0a0a;
    border: #2f2f2f 1px solid;
    border-radius: 10px 0 0 10px;
`;

export const RoadmapDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #d9d9d9;

    /* background: #212121; */
    width: 100%;
    padding: 10px 5px;

    /* border-radius: 5px; */
    gap: 5px;
`;

export const RoadmapDetailsCard = styled.h3`
    padding: 0 10px;
    border-radius: 3px;
    width: 100%;
    background: #131313;
    display: flex;
    margin: 0 0 5px;
    cursor: pointer;
    color: #d0d0d0;
    transition: all 0.3s ease-in-out;

    &:hover {
        background: #ff6b08;
        color: #0a0a0a;
    }

    ${({ $isSelected }) =>
        $isSelected &&
        `
        background: #ff6b08;
        color: #0a0a0a;
    `}
`;

export const ContentData = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 100%;
    min-width: 200px;
    max-width: 1200px;
    border: #2f2f2f 1px solid;
    border-radius: 0 10px 10px 0;
    margin: 0 auto;
    height: 100%;

    @media (width <= 800px) {
        max-width: 98%;
        border-radius: 0;
    }
`;

export const MarkdownContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background: #101010;
    height: 100%;
`;

export const MarkdownPreview = styled(MDEditor.Markdown)`
    color: #f5f5f5;
    font-size: 18px;
    width: 100%;
    background: #0a0a0a;
    padding: 20px;
    word-wrap: break-word;
    overflow-wrap: break-word;

    /* white-space: pre-wrap; */
    overflow: hidden auto;
    height: 80vh;

    &::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;

    pre {
        color: #f5f5f5;
        border-radius: 5px;
        padding: 10px;
        font-size: 16px;
        margin: 10px 0;
        font-family: "Fira Code", monospace;
    }
`;

export const ToggleButton = styled.button`
    /* position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    border: none; */
    background: #2f2f2f;
    color: #f5f5f5;
    padding: 10px;
    cursor: pointer;
    z-index: 1;
    display: none;

    @media (width <= 800px) {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
`;
export const ResponsiveToggleButton = styled.button`
    display: none;
    width: 10%;

    @media (width <= 800px) {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        cursor: pointer;
        color: #f5f5f5;
        z-index: 1;
        text-align: center;
        padding-right: 10px;
    }
`;

export const HackBookTitleContainer = styled.div`
    display: flex;
    background: #2f2f2f;
    height: 50px;
`;
