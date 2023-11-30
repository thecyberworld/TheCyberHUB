import { FcSearch } from "react-icons/fc";
import styled from "styled-components";

export const SearchInput = styled.input`
    border: none;
    background: #252525;
    color: #d7d7d7;
    padding: 8px;
    font-size: 16px;
    width: 300px;
    border-radius: 0 4px 4px 0;
    @media screen and (max-width: 380px) {
        width: 100%;
    }

    @media screen and (max-width: 800px) {
        width: 100%;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 1px #1a1c1d;
    }
`;
export const SearchBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    background: #131313;
    border-radius: 5px;
    padding: 0 0 0 10px;
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
