import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import {
    BiHomeCircle,
    BiBookmarks,
    BiLogoBlogger,
    BiLogoAlgolia,
    BiCog,
    BiSolidChevronLeft,
    BiSolidChevronRight,
    BiSolidCircle,
    BiChat,
} from "react-icons/bi";

export const DashboardSidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    background: #090909;
    height: 100vh;
    border-radius: 10px;
    color: #f5f5f5;
    border-right: #2a2a2a 1px solid;
    gap: 15px;

    // stick to the top
    position: sticky;
    top: 0;
    min-width: ${(props) => (props.isOpen ? "250px" : "75px")};
    transition: width 0.3s ease-in-out;

    .heading {
        margin-top: 32px;
        margin-bottom: 0;
    }
`;

export const RouteLink = styled(Link)`
    text-decoration: none;
    color: #f5f5f5;
`;
export const SideBarLink = styled(NavLink)`
    text-decoration: none;
    color: #f5f5f5;
    display: flex;
    align-items: center;
    border-radius: 8px;
    height: 50px;
    gap: 16px;
    padding-left: ${(props) => (props.isOpen ? "24px" : "0")};
    transition: background 0.3s ease-in-out, padding 0.3s ease-in-out;
    width: 100%;
    justify-content: ${(props) => (props.isOpen ? "unset" : "center")};

    &:hover,
    &.active {
        background: ${(props) => (props.isOpen ? "#009dec" : "")};
        color: ${(props) => (props.isOpen ? "" : "#009dff")};
    }
`;

export const SidebarTitle = styled.h2`
    color: #f5f5f5;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    opacity: ${(props) => (props.isOpen ? "1" : "0")};
    transition: opacity 0.6s ease-in-out 0.2s;
    margin-bottom: 0;
`;

export const ToggleButton = styled.div`
    cursor: pointer;
    position: absolute;
    top: 100px;
    right: ${(props) => (props.isOpen ? "-32px" : "")};
    padding: ${(props) => (props.isOpen ? "10px" : "17px")};
    border-radius: 12px;
`;

export const UserProfile = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
    height: 120px;
    margin-left: ${(props) => (props.isOpen ? "0" : "8px")};

    .user-profile-image {
        position: relative;

        img {
            width: 80px;
            height: 80px;
            border-radius: 100%;
            object-fit: cover;
        }
    }

    h3 {
        margin-bottom: 2px;
        font-weight: 800;
    }
`;

export const UserProfileDescription = styled.div`
    margin-left: ${(props) => (props.isOpen ? "16px" : "0")};
    opacity: ${(props) => (props.isOpen ? "1" : "0")};
    transform: ${(props) => (props.isOpen ? "translateX(0)" : "translateX(-100%)")};
    transition: opacity 0.3s ease, transform 0.3s ease;
    visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
    width: ${(props) => (props.isOpen ? "unset" : "0")};
`;

const createStyledIcon = (IconComponent) => {
    return styled(IconComponent)`
        width: 28px;
        height: 28px;
    `;
};

export const BiSolidCircleIcon = styled(BiSolidCircle)`
    width: 20px;
    height: 20px;
    color: #b9f62e;
    position: absolute;
    bottom: 4px;
    right: 6px;
`;

export const BiHomeCircleIcon = createStyledIcon(BiHomeCircle);
export const BiBookmarksIcon = createStyledIcon(BiBookmarks);
export const BiLogoBloggericon = createStyledIcon(BiLogoBlogger);
export const BiLogoAlgoliaIcon = createStyledIcon(BiLogoAlgolia);
export const CiSettingsIcon = createStyledIcon(BiCog);
export const BiSolidChevronLeftIcon = createStyledIcon(BiSolidChevronLeft);
export const BiSolidChevronRighIcon = createStyledIcon(BiSolidChevronRight);
export const BiChatIcon = createStyledIcon(BiChat);
