import styled from "styled-components";

export const BlogsComponent = styled.div`
    display: flex;
    max-width: 1500px;
`;

export const MiddleContainer = styled.div`
    display: flex;
    margin: auto 10px;
    min-width: 250px;
    align-items: flex-start;
    justify-content: flex-start;
    border: #4cc23e 1px solid;
`;

export const SubContainerTop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const SubContainerHeading = styled.h4``;
export const AllBlogs = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    max-width: 1400px;

    a {
        text-decoration: none;
        color: #cecac3;
    }
`;

export const ViewBlogComponent = styled.div`
    width: 80%;
    margin: 100px auto;
    display: flex;
    flex-direction: column;
    max-width: 800px;
    padding-top: 0;
    align-items: center;
    justify-content: space-between;
    font-family: "Montserrat", sans-serif;
    color: #cecac3;

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
