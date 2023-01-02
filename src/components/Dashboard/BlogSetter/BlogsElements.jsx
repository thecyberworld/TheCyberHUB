import styled from "styled-components";

export const BlogsComponent = styled.div`
    display: flex;
    width: 100%;
    max-width: 1500px;
`;

export const MiddleContainer = styled.div`
    display: flex;
    width: auto;
    margin: 0 10px;
    align-items: start;
    justify-content: start;
`;

export const SubContainerTop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const SubContainerHeading = styled.h4``;
export const AllBlogs = styled.div`
    max-width: 950px;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    a {
        text-decoration: none;
        color: #cecac3;
    }
`;
