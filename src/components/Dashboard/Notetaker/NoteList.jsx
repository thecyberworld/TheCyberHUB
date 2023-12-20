import React from "react";
import { NotesListContainer, NotesListNoFound } from "./NoteElements";
import NoteItem from "./NoteItem";

const NoteList = ({ children, onPick, onPin, pickedNoteId }) => {
    return (
        <NotesListContainer>
            {!children.length && <NotesListNoFound>There Are No Notes</NotesListNoFound>}
            {children.map((note) => (
                <NoteItem key={note._id} {...note} onPick={onPick} onPin={onPin} isPicked={note._id === pickedNoteId} />
            ))}
        </NotesListContainer>
    );
};
export default NoteList;
