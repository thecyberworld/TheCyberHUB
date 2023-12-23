import styled from "styled-components";

export const CategoriesSidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 250px;
    @media screen and (max-width: 800px) {
        width: 35%;
    }
`;

export const CategoriesSidebarHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    border: 2px solid #111111;
    height: 3rem;
`;

export const CategoriesSidebarHeaderTitle = styled.h3`
    color: #fff;
    text-align: center;
    margin-bottom: 0;
    font-family: "Roboto Mono", monospace;
`;
export const CategoriesListContainer = styled.ul`
    flex: ${(props) => (props.required ? "" : 1)};
    margin-bottom: ${(props) => (props.required ? "5px" : "0")};
    display: flex;
    flex-direction: column;
    gap: 5px;
    border: 2px solid #111111;
    border-top: 0px;
    padding: 5px;
    overflow-y: auto;
`;
export const CategoriesListNoFound = styled.h4`
    color: #787878;
    text-align: center;
    margin-bottom: 0;
    font-family: "Roboto Mono", monospace;
`;
export const CategoryItemElementContainer = styled.div`
    position: relative;
`;
export const CategoryItemElement = styled.li`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    width: 100%;
    padding: 10px;
    gap: 5px;
    background-color: ${(props) => (props.isPicked ? "#2a2a2a" : "#090909")};

    border: 1px solid #111111;
    border-radius: 5px;

    color: #f5f5f5;

    &:hover {
        background-color: #383838;
        cursor: pointer;
    }

    @media screen and (max-width: 500px) {
        font-size: 1.5rem;
        padding: 25px;
    }
`;
export const CategoryItemShortTitle = styled.p`
    text-transform: capitalize;
    font: 15px "Roboto Mono", monospace;
    font-weight: 600;
`;
