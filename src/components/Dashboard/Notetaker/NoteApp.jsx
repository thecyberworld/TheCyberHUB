import React, { useState, useEffect } from "react";
import NoteList from "./NoteList";
import { nanoid } from "nanoid";

const NoteApp = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("notes"));
        if (savedNotes) {
            setNotes(savedNotes);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
        const notesData = JSON.parse(localStorage.getItem("notes"));
        if (notesData) {
            setNotes(notesData);
        }
    }, [notes]);

    const addNote = (text) => {
        const newNote = {
            text,
            id: nanoid(),
        };
        const newNotes = [...notes, newNote];
        setNotes(newNotes);
    };

    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
    };

    return (
        <div>
            <NoteList notes={notes} handleAddNote={addNote} handleDeleteNote={deleteNote} />
        </div>
    );
};

export default NoteApp;
