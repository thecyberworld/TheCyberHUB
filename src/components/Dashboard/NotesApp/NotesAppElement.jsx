import styled from "styled-components";
import { Link } from "react-router-dom";

export const NotesAppContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: 1px solid orange;
    padding: 25px;
    color:white;
    //max-width: 1500px;
`;

export const LeftSectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    border: 1px solid orange;
    max-width: 500px;
    padding: 25px;
`
export const TitleCard = styled.div`
    border: 1px solid orange;
    padding: 25px;
`
export const NoteTitle = styled.p`
    
`
export const NoteDescription = styled.p`
    
`