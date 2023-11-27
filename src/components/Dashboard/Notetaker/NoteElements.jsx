import styled from "styled-components";

export const NotesContainer = styled.div`
    display: flex;
    width: 100%;
`;

export const NotesSidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 100vh;
`;

export const NotesSidebarHeader = styled.div`
    padding: 0 10px;
    border: 2px solid #111111;
    height: 3rem;
`;

export const NotesSidebarSearch = styled.div`
    padding: 0 10px;
    border: 2px solid #111111;
    border-top: 0px;
    height: 2.7rem;
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
    width: 70%;
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
