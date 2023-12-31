import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";

export const LeftSection = styled.div`
    min-width: 250px;
    max-width: 300px;
    width: 100%;
    flex: 1;

    @media (max-width: 600px) {
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

    @media (max-width: 600px) {
        /* Adjust styles for smaller screens */
        flex-direction: column;
        max-width: 100%;
    }
`;

export const HackBookTitle = styled.h1`
    font-size: 24px;
    padding: 15px 25px;
    text-align: center;
    align-content: center;
    justify-content: center;
    background: #2f2f2f;
    font-family: "Poppins", sans-serif;
`;

export const HackBookHeading = styled.p`
    font-size: 16px;
    font-weight: 600;
    padding: 5px 10px;
    text-align: start;
    align-content: center;
    justify-content: center;
`;

export const ContentNavData = styled.div`
    display: flex;
    border-radius: 5px;
    flex-direction: column;
    width: 100%;
    //gap: 5px;

    overflow-y: auto;
    overflow-x: hidden;
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
    padding: 0 0 5px 0;
    background: #0a0a0a;
    border: #2f2f2f 1px solid;
    border-radius: 10px 0 0 10px;
`;

export const RoadmapDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #d9d9d9;
    //background: #212121;
    width: 100%;
    padding: 10px 5px;
    //border-radius: 5px;
    gap: 5px;
`;

export const RoadmapDetailsCard = styled.h3`
    padding: 0 10px;
    border-radius: 3px;
    width: 100%;
    background: #131313;
    display: flex;
    margin: 0 0 5px 0;
    cursor: pointer;
    color: #d0d0d0;
    transition: all 0.3s ease-in-out;

    &:hover {
        background: #ff6b08;
        color: #0a0a0a;
    }

    ${({ isSelected }) =>
        isSelected &&
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
    max-width: 1200px;
    border: #2f2f2f 1px solid;
    border-radius: 0 10px 10px 0;
    margin: 0 auto;
    height: 100%;

    @media (max-width: 600px) {
        max-width: 100%;
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
    //white-space: pre-wrap;

    overflow-y: auto;
    overflow-x: hidden;
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
    //position: absolute;
    //top: 50%;
    //left: 0;
    //transform: translate(0, -50%);
    //border: none;
    background: #2f2f2f;
    color: #f5f5f5;
    padding: 10px;
    cursor: pointer;
    z-index: 1;
    display: none;

    @media (max-width: 800px) {
        display: block;
    }
`;
