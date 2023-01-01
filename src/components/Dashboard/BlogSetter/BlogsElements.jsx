import styled from "styled-components";

export const BlogsComponent = styled.div`
    display: flex;
    max-width: 1500px;
    border: #4cc23e 1px solid;
`;

export const MiddleContainer = styled.div`
    display: flex;
    margin: 0px 10px;
    align-items: start;
    justify-content: start;
    border: #4cc23e 1px solid;
`;

export const SubContainerTop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const SubContainerHeading = styled.h4``;
export const AllBlogs = styled.div`
    min-width: 950px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: auto;

    a {
        text-decoration: none;
        color: #cecac3;
    }
`;
