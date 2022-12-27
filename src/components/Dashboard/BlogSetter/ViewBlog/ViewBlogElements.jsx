import styled from "styled-components";

export const ContainerViewBlog = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    border: #4cc23e 1px solid;
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
        padding: 0 50px;
        white-space: pre-line;
        font-size: 20px;
    }

    img {
        margin-top: 0;
        width: 100%;
        object-fit: contain;
        border-radius: 5px;
    }
`;
