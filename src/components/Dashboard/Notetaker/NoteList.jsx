import React from "react";
import { NotesListContainer, NotesListNoFound } from "./NoteElements";
import NoteItem from "./NoteItem";

const NoteList = ({ children, onPick, onPin }) => {
    return (
        <NotesListContainer>
            {!children.length && <NotesListNoFound>There Are No Notes</NotesListNoFound>}
            {children.map((note) => (
                <NoteItem key={note._id} {...note} onPick={onPick} onPin={onPin} />
            ))}
        </NotesListContainer>
    );
};
export default NoteList;
