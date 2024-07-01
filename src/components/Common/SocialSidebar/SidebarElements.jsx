import styled, { css } from "styled-components";

const commonStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
    color: #fff;
    box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
    border-radius: 10px;
    max-width: 500px;
`;

export const SidebarContainer = styled.div`
    ${(props) =>
        props.$sidebarType === "feeds" &&
        css`
            ${commonStyles}
            position: unset;
            margin: 1rem 0;

            @media screen and (width >= 950px) {
                position: sticky;
                top: 100px;
                padding: 0 1rem;
            }
        `}

    ${(props) =>
        props.$sidebarType === "explore" &&
        css`
            ${commonStyles}
            position: sticky;
            top: 100px;
            min-width: 400px;
        `}
`;

export const FilterButton = styled.button`
    font-size: 15px;
    width: 100%;
    gap: 10px;
    font-weight: 600;
    background-color: ${({ $activeButton }) => ($activeButton ? "#ff6b08" : "")};
    color: ${({ $activeButton }) => ($activeButton ? "#0a0a0a" : "")};
    height: 6vh;
    padding: 0 20px;

    &:first-child {
        border-top-left-radius: 7px;
        border-bottom-left-radius: 7px;
    }

    &:last-child {
        border-top-right-radius: 7px;
        border-bottom-right-radius: 7px;
    }
`;
