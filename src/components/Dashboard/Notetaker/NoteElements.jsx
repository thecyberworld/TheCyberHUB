import styled from "styled-components";

export const NotesContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
`;

export const NotesSidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 370px;
    height: 100vh;
    @media screen and (max-width: 800px) {
        width: 35%;
    }
`;

export const NotesSidebarHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    border: 2px solid #111111;
    height: 3rem;
`;

export const NotesSidebarHeaderTitle = styled.h3`
    color: #fff;
    text-align: center;
    margin-bottom: 0;
    font-family: "Roboto Mono", monospace;
`;
export const SearchContainer = styled.div`
    display: flex;
    border: 2px solid #111111;
    background-color: #111111;
    border-top: 0px;
    height: 3rem;
`;

export const NotesSidebarCardsContainer = styled.div`
    flex: 1;
    border: 2px solid #111111;
    border-top: 0px;
    padding: 0 10px;
`;

export const NotesDescrContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100vh;
`;

export const NotesDescrHeader = styled.div`
    border: 2px solid #111111;
    border-left: 0px;
    padding: 0 10px;
    height: 3rem;
`;

export const NotesDescr = styled.div`
    flex: 1;
    border: 2px solid #111111;
    border-top: 0px;
    border-left: 0px;
    padding: 0 10px;
`;
