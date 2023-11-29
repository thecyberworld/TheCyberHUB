import React from "react";
import { NotesListContainer } from "./NoteElements";
import NoteItem from "./NoteItem";

const NoteList = ({ children, onPick }) => {
    return (
        <NotesListContainer>
            {children.map((note) => (
                <NoteItem key={note.id} {...note} onPick={onPick} />
            ))}
        </NotesListContainer>
    );
};
export default NoteList;
