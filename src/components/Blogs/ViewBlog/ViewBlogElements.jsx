import styled from "styled-components";
import ReactMarkdown from "react-markdown";

export const ContentReactMarkdown = styled(ReactMarkdown)`
    text-align: start;
    max-width: 1000px;
    padding: 50px;

    * {
        font-family: "Poppins", sans-serif;
        margin: 10px auto;
    }

    a {
        color: #f4f4f4;
    }

    h1 {
        font-size: 2em;
        border-bottom: 1px #2a2a2a solid;
        width: 100%;
    }

    h2 {
        font-size: 1.5em;
    }

    h3 {
        font-size: 1.17em;
    }

    h4 {
        font-size: 1em;
    }

    h5 {
        font-size: 0.83em;
    }

    h6 {
        font-size: 0.67em;
    }
    code {
        font-family: "Roboto Mono", monospace;
        white-space: pre-wrap;
        word-break: break-word;
    }

    p {
        //font-family: "Roboto Mono", monospace;
        font-family: "Poppins", sans-serif;
        text-align: left;
        white-space: pre-line;
        font-size: 20px;
        line-height: 1.5;
    }

    ol {
        list-style-type: decimal;
        //font-family: "Roboto Mono", monospace;
        text-align: left;
        font-size: 20px;
        line-height: 1.5;
        margin: 0 -60px;
        padding-left: -10px;
    }

    ul {
    }

    li {
        list-style-type: square;
        //font-family: "Roboto Mono", monospace;
        text-align: left;
        margin: 0 50px;
        padding: 0 10px;
        white-space: pre-line;
        font-size: 20px;
        line-height: 1.5;
    }

    img {
        margin-top: 0;
        width: 100%;
        object-fit: contain;
        border-radius: 5px;
    }
`;
export const ContentSection = styled.div`
    background: #111111;
    min-height: 685px;
`;
export const ContainerViewBlog = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 50px;
    max-width: 1000px;
`;

export const ViewBlogHeader = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 0;
    //font-family: "Montserrat", sans-serif;
    color: #cecac3;
    max-width: 1000px;
`;

export const CommentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
`;
