import styled from "styled-components";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Link } from "react-router-dom";

export const SidebarContainer = styled.div`
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 20px;
    min-width: 250px;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

export const SidebarSection = styled.div`
    margin-bottom: 20px;
`;

export const RouteLink = styled(Link)`
    text-decoration: none;
    color: #ecf0f1;
    margin-bottom: 10px;
`;

export const SidebarTitle = styled.h3`
    margin: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

export const ChannelList = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ChannelItem = styled.div`
    padding: 12px 0;
`;

export const UserList = styled.div`
    display: flex;
    flex-direction: column;
`;

export const UserItem = styled.div`
    padding: 12px 0;
    cursor: pointer;
    &:hover {
        background-color: #34495e;
    }
`;

export const ExpandIcon = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
`;

export const BsChevronDownIcon = styled(BsChevronDown)`
    margin-left: auto;
`;

export const BsChevronUpIcon = styled(BsChevronUp)`
    margin-left: auto;
`;
