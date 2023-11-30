// import NoteListOld from "./NoteListOld";
// import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import {
    NotesContainer,
    NotesSidebarContainer,
    NotesSidebarHeader,
    NotesDescriptionHeader,
    NotesDescription,
    NotesDescriptionContainer,
    NotesSidebarHeaderTitle,
    SearchContainer,
    DescriptionTitle,
    DescriptionContent,
} from "./NoteElements";
import SearchInputBox from "../../Common/SearchInputBox";
import "./NoteApp.css";
import NoteList from "./NoteList";

const DUMMY_DATA = [
    {
        id: 1,
        title: "Exploring JWT Security and Vulnerabilities",
        description:
            "JSON Web Tokens (JWT) are widely used for authentication and authorization. However, like any technology, they have potential vulnerabilities that need to be understood and addressed.",
    },
    {
        id: 2,
        title: "Responsible Disclosure",
        description:
            "We take the security of our website very seriously and appreciate the contributions of security researchers to help keep our website secure. If you discover a security vulnerability, please report it to us using the contact information provided below. We ask that you please do not publicly disclose the vulnerability until we have had a chance to investigate and address the issue.",
        pinned: false,
    },
    {
        id: 3,
        title: "What is two-factor authentication and how does it work?",
        description:
            "I've been hearing a lot about two-factor authentication lately, but I'm not sure what it is or how it works. Can anyone explain it to me?I've been hearing a lot about two-factor authentication lately, but I'm not sure what it is or how it works. Can anyone explain it to me?I've been hearing a lot about two-factor authentication lately, but I'm not sure what it is or how it works. Can anyone explain it to me?I've been hearing a lot about two-factor authentication lately, but I'm not sure what it is or how it works. Can anyone explain it to me?",
        pinned: false,
    },
];

const NoteApp = () => {
    const [notes, setNotes] = useState(DUMMY_DATA);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [pickedNote, setPickedNote] = useState({});
    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));
        if (savedNotes !== "") {
            setNotes(savedNotes);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
    }, [notes]);

    useEffect(() => {
        const newFilteredNotes = notes.filter((note) => {
            return (
                note?.title?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
                note?.description?.toLowerCase().includes(searchTerm?.toLowerCase())
            );
        });
        console.log(newFilteredNotes, searchTerm);
        setFilteredNotes(newFilteredNotes);
    }, [searchTerm]);

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handlePickNote = (noteId) => {
        const pickedNote = notes.find((note) => note.id === noteId);
        setPickedNote(pickedNote !== -1 ? pickedNote : {});
    };
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
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                    />
                </SearchContainer>

                <NoteList onPick={handlePickNote}>{filteredNotes}</NoteList>
            </NotesSidebarContainer>
            <NotesDescriptionContainer>
                <NotesDescriptionHeader></NotesDescriptionHeader>
                <NotesDescription>
                    <DescriptionTitle>{pickedNote.title}</DescriptionTitle>
                    <DescriptionContent>{pickedNote.description}</DescriptionContent>
                </NotesDescription>
            </NotesDescriptionContainer>
        </NotesContainer>

        //     <NoteList notes={notes} handleAddNote={addNote} handleDeleteNote={deleteNote} />
    );
};

export default NoteApp;
