import styled from "styled-components";

export const SidebarContainer = styled.div`
    position: ${(props) => (props.$sidebarType === "feeds" ? "unset" : "sticky")};
    top: ${(props) => (props.$sidebarType === "feeds" ? "unset" : "100px")};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
    max-width: ${(props) => (props.$sidebarType === "feeds" ? "unset" : "200px")};
    min-width: ${(props) => (props.$sidebarType === "explore" ? "310px" : "400px")};
    color: #fff;
    box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
    border-radius: 10px;
    margin: ${(props) => (props.$sidebarType === "feeds" ? "1rem 0" : "unset")};
    padding: ${(props) => (props.$sidebarType === "feeds" ? "0 3rem" : "unset")};

    @media screen and (width >= 950px) {
        position: ${(props) => (props.$sidebarType === "feeds" ? "sticky" : "")};
        top: ${(props) => (props.$sidebarType === "feeds" ? "100px" : "")};
        max-width: ${(props) => (props.$sidebarType === "feeds" ? "500px" : "200px")};
    }

    @media screen and (width >= 400px) {
        padding: ${(props) => (props.$sidebarType === "feeds" ? "0 1rem" : "")};
    }
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
