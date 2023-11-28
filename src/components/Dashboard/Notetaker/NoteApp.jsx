// import NoteListOld from "./NoteListOld";
// import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import {
    NotesContainer,
    NotesSidebarContainer,
    NotesSidebarHeader,
    NotesDescrHeader,
    NotesDescr,
    NotesDescrContainer,
    NotesSidebarHeaderTitle,
    SearchContainer,
} from "./NoteElements";
import SearchInputBox from "../../Common/SearchInputBox";
import "./NoteApp.css";
import NoteList from "./NoteList";

const DUMMY_DATA = [
    {
        id: 1,
        title: "If you discover a security vulnerability,we want to hear about it.",
        descr: "If you have discovered a security vulnerability on our website, we encourage you to report it to us as soon as possible.",
        active: false,
        pinned: false,
    },
    {
        id: 2,
        title: "Responsible Disclosure",
        descr: "We take the security of our website very seriously and appreciate the contributions of security researchers to help keep our website secure. If you discover a security vulnerability, please report it to us using the contact information provided below. We ask that you please do not publicly disclose the vulnerability until we have had a chance to investigate and address the issue.",
        active: false,
        pinned: false,
    },
];

const NoteApp = () => {
    const [notes, setNotes] = useState(DUMMY_DATA);
    const [search, setSearch] = useState("");
    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));
        if (savedNotes !== "") {
            setNotes(savedNotes);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
    }, [notes]);

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

                <NoteList>{notes}</NoteList>
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
