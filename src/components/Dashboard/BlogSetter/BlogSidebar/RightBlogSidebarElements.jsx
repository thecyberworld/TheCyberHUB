import styled from "styled-components";
import { Link } from "react-router-dom";

export const RightBlogSidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 600px;
    min-width: 250px;
    align-items: start;
    justify-content: start;
    border: #4cc23e 1px solid;
`;

export const SeeAll = styled(Link)`
    justify-content: flex-end;
    color: antiquewhite;
    border: #666666 1px solid;
    border-radius: 10px;
    padding: 5px 10px;
    font-size: 15px;
`;

export const BlogStatus = styled.div`
    padding: 10px;
    width: 100%;
    height: auto;
    background: #101010;
    margin-bottom: 15px;
    border-radius: 5px;
`;

export const DraftStatus = styled.div`
    padding: 10px;
    width: 100%;
    height: auto;
    background: #101010;
    margin-bottom: 15px;
    border-radius: 5px;
`;

export const TrendingBlogs = styled.div`
    padding: 10px;
    width: 100%;
    height: auto;
    background: #101010;
    margin-bottom: 15px;
    border-radius: 5px;
`;
