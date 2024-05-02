import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";
import { CloseIcon } from "src/components/Header/Sidebar/SidebarElements";

export const SideCloseIcon = styled(CloseIcon)`
    margin-left: 50%;
    top: 0;
    height: 100%;
    width: 20px;
    cursor: pointer;

    @media screen and (min-width: 900px) {
        display: none;
    }
`;

export const DropdownContainer = styled.div`
    border-radius: 0;
    width: 100%;
    height: auto;
    padding: 1rem;
    position: absolute;
    top: 80px;
    left: 0;
    z-index: 999;
    background: #030303;
    display: block;

    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    @media screen and (max-width: 821px) {
        display: flex;
        padding: 0;
        background: transparent;
        position: static;
    }
`;

export const DropdownItemsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    text-align: center;
    max-width: 60rem;
    height: auto;
    margin: 0 auto;
    margin-bottom: 1rem;
    z-index: 999;
    width: max-content;
    gap: 25px;
    padding: 25px;
    @media screen and (max-width: 821px) {
        height: max-content;
        // background: #000000;
        background: transparent;
        backdrop-filter: blur(1000px);
        -webkit-backdrop-filter: blur(1000px);
        // box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        // flex-direction: column;
        padding: 0;
        margin-right: 1rem;
        width: 62%;
    }
`;

export const DropdownItemContainer = styled.div`
    color: black;
    position: relative;
    width: 270px;
    z-index: 999;
    background: none;
    border: none;
    margin: 0;

    &:hover {
        cursor: pointer;
    }

    @media screen and (max-width: 821px) {
        // width: min-content;
        background: rgba(194, 108, 62, 0.04);
        border: 1px solid rgba(194, 113, 62, 0.2);
        border-radius: 10px;
        padding: 1rem;
        margin: 0.4rem;
        width: 100%;
    }
`;

export const DropdownItem = styled.h2`
    text-align: start;
    font-size: 1.5rem;

    &:hover {
        transition: all 0.2s ease-in-out;
        transform: scale(1.05);
        border-bottom: 3px solid #ff6b08;
    }
    @media screen and (max-width: 768px) {
        font-size: 1.1rem;
        width: max-content;
        margin: 0;
    }
`;

export const DropdownDesc = styled.p`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: start;
    align-items: start;
    color: #ababab;
    word-wrap: break-word;
    @media screen and (max-width: 821px) {
        font-size: 0.8rem;
        widht: max-content;
        display: none;
    }
`;

export const DropdownRouterLink = styled(LinkRouter)`
    text-decoration: none;
    color: #f5f5f5;
    @media screen and (max-width: 821px) {
        display: flex;
        margin: 0;
    }
`;
