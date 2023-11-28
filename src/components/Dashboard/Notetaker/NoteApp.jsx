// import NoteList from "./NoteList";
// import { nanoid } from "nanoid";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import {
    NotesContainer,
    NotesSidebarContainer,
    NotesSidebarHeader,
    NotesDescrHeader,
    NotesSidebarCardsContainer,
    NotesDescr,
    NotesDescrContainer,
    NotesSidebarHeaderTitle,
    SearchContainer,
} from "./NoteElements";
import SearchInputBox from "../../Common/SearchInputBox";
import "./NoteApp.css";

const NoteApp = () => {
    // const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");
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
                <NotesSidebarHeader>
                    <RxHamburgerMenu className="icon" size="24px" title="menu" />
                    <NotesSidebarHeaderTitle>All Notes</NotesSidebarHeaderTitle>
                    <FiEdit className="icon" size="24px" title="new" />
                </NotesSidebarHeader>
                <SearchContainer>
                    <SearchInputBox
                        placeholder="Search all notes and tags"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </SearchContainer>

                <NotesSidebarCardsContainer></NotesSidebarCardsContainer>
            </NotesSidebarContainer>
            <NotesDescrContainer>
                <NotesDescrHeader></NotesDescrHeader>
                <NotesDescr></NotesDescr>
            </NotesDescrContainer>
        </NotesContainer>

        //     <NoteList notes={notes} handleAddNote={addNote} handleDeleteNote={deleteNote} />
    );
};

export default NoteApp;
