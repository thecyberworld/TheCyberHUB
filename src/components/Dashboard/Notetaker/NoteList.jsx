import React from "react";
import { NotesListContainer } from "./NoteElements";
import NoteItem from "./NoteItem";

const NoteList = ({ children }) => {
    return (
        <NotesListContainer>
            {children.map((note) => (
                <NoteItem key={note.id} {...note} />
            ))}
        </NotesListContainer>
    );
};
export default NoteList;
