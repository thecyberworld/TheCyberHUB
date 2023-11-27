// import React, { useState, useEffect } from "react";
// import NoteList from "./NoteList";
// import { nanoid } from "nanoid";
import React from "react";
import {
    NotesContainer,
    NotesSidebarContainer,
    NotesSidebarHeader,
    NotesDescrHeader,
    NotesSidebarSearch,
    NotesSidebarCardsContainer,
    NotesDescr,
    NotesDescrContainer,
} from "./NoteElements";

const NoteApp = () => {
    // const [notes, setNotes] = useState([]);

    // useEffect(() => {
    //     const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));
    //     if (savedNotes !== "") {
    //         setNotes(savedNotes);
    //     }
    // }, []);

    // useEffect(() => {
    //     localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
    // }, [notes]);

    // const addNote = (text) => {
    //     const newNote = {
    //         text,
    //         id: nanoid(),
    //     };
    //     const newNotes = [...notes, newNote];
    //     setNotes(newNotes);
    // };

    // const deleteNote = (id) => {
    //     const newNotes = notes?.filter((note) => note.id !== id);
    //     setNotes(newNotes);
    // };

    return (
        <NotesContainer>
            <NotesSidebarContainer>
                <NotesSidebarHeader></NotesSidebarHeader>
                <NotesSidebarSearch></NotesSidebarSearch>
                <NotesSidebarCardsContainer></NotesSidebarCardsContainer>
            </NotesSidebarContainer>
            <NotesDescrContainer>
                <NotesDescrHeader></NotesDescrHeader>
                <NotesDescr></NotesDescr>
            </NotesDescrContainer>
        </NotesContainer>
        // <div className="wrapper">
        //     <NoteList notes={notes} handleAddNote={addNote} handleDeleteNote={deleteNote} />
        // </div>
    );
};

export default NoteApp;
