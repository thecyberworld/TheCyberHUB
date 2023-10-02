import React from "react";
import Note from "./Note";
import AddNote from "./AddNote";

const NoteList = ({ id, notes, handleAddNote, handleDeleteNote }) => {
    return (
        <div>
            {notes.map((note) => (
                <Note key={note.id} id={note.id} text={note.text} handleDeleteNote={handleDeleteNote} />
            ))}
            <AddNote handleAddNote={handleAddNote} />
        </div>
    );
};

export default NoteList;
