import styled from "styled-components";
import { Link } from "react-router-dom";

export const SidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 25px;
    background: #36403e;
    width: 300px;
    height: 100vh;
    border-radius: 10px;
    color: #f5f5f5;
    border-right: #2a2a2a 1px solid;
    gap: 15px;

    // stick to the top
    position: sticky;
    top: 0;
`;

export const RouteLink = styled(Link)`
    text-decoration: none;
    color: #f5f5f5;
`;

export const SidebarTitle = styled.h3`
    color: #f5f5f5;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s ease-in-out;
`;

export const RoutesContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
    width: 100%;
    max-width: 1500px;
`;
