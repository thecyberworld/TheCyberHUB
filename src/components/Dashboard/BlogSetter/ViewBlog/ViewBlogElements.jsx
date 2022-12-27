import styled from "styled-components";
import ReactMarkdown from "react-markdown";

export const ContentReactMarkdown = styled(ReactMarkdown)`
    text-align: start;
`;
export const ContainerViewBlog = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    margin: 50px;
`;

export const ViewBlogHeader = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    padding-top: 0;
    align-items: center;
    justify-content: space-between;
    font-family: "Montserrat", sans-serif;
    color: #cecac3;
    margin-bottom: 50px;

    * {
        margin: 10px auto;
    }

    p {
        font-family: "Roboto Mono", monospace;
        text-align: left;
        //padding: 0 50px;
        white-space: pre-line;
        font-size: 20px;
        line-height: 1.5;
    }
    li {
        list-style-type: disc;
        font-family: "Roboto Mono", monospace;
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
