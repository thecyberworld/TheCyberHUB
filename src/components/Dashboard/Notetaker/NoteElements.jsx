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
export const NotesListNoFound = styled.h4`
    color: #787878;
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

export const NotesListContainer = styled.ul`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 2px solid #111111;
    border-top: 0px;
    padding: 20px 15px;
    overflow-y: auto;
`;
export const NoteItemPinningContainer = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    display: ${(props) => (props.isPinned ? "block" : "none")};
`;
export const NoteItemElementContainer = styled.div`
    position: relative;
    &:hover ${NoteItemPinningContainer} {
        display: block;
    }
`;
export const NoteItemElement = styled.li`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    width: ${(props) => (props.isPicked ? "95%" : "100%")};
    padding: 10px;
    gap: 5px;
    background-color: ${(props) => (props.isPinned ? "#2a2a2a" : "#090909")};
    left: ${(props) => (props.isPicked ? "17px" : "0")};
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

export const NoteItemShortTitle = styled.h4`
    text-transform: capitalize;
    font-weight: 900;
`;

export const NoteItemShortDescription = styled.p`
    font-family: "Roboto", sans-serif;
    font-weight: 100;
    width: 100%;
    overflow-wrap: break-word;
    font-style: ${(props) => (props.empty ? "italic" : "")};
    opacity: ${(props) => (props.empty ? "0.7" : "")};
`;

export const NotesDescriptionContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100vh;
`;

export const NotesDescriptionHeader = styled.div`
    border: 2px solid #111111;
    border-left: 0px;
    padding: 0 20px;
    height: 3rem;
    display: flex;
    justify-content: end;
    align-items: center;
`;
export const NotesDescriptionIconsContainer = styled.div`
    width: ${(props) => props.icons * 50}px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const NotesDescription = styled.div`
    position: absolute;
    top: 3rem;
    left: 0;
    width: 100%;
    max-height: calc(100vh - 3rem);
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    color: #f5f5f5;
    padding: 20px;
    overflow-y: auto;
`;

export const DescriptionTitle = styled.div`
    width: 100%;
    overflow-wrap: break-word;
`;

export const DescriptionContent = styled.div``;

export const DescriptionDisplayTitle = styled.h1`
    text-transform: capitalize;
    width: 100%;
`;
