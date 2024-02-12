import { FcSearch } from "react-icons/fc";
import styled from "styled-components";
import { VscClose } from "react-icons/vsc";

export const SearchInput = styled.input`
    border: none;
    background: #252525;
    color: #d7d7d7;
    padding: 8px;
    font-size: 16px;
    width: 100%;
    border-radius: 0 4px 4px 0;
    outline: none;
    @media screen and (max-width: 380px) {
        width: 100%;
    }

    @media screen and (max-width: 800px) {
        width: 100%;
    }
`;
export const SearchBox = styled.div`
    display: flex;
    position: relative;
    left: 0;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    background: #252525;
    padding: 0 5px;
    @media screen and (max-width: 380px) {
        width: 100%;
    }
`;

export const SearchIcon = styled(FcSearch)`
    font-size: 2rem;
    color: #d7d7d7;
    cursor: pointer;
    transition: 0.2s ease-in-out;
`;

export const CancelIcon = styled(VscClose)`
    font-size: 1.7rem;
    color: rgb(238, 238, 238);
    cursor: pointer;
    transition: 0.2s ease-in-out;
`;
