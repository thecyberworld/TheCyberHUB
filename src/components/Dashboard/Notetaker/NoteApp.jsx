// import NoteListOld from "./NoteListOld";
// import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdNoteAdd } from "react-icons/md";
import {
    NotesContainer,
    NotesSidebarContainer,
    NotesSidebarHeader,
    NotesSidebarHeaderTitle,
    SearchContainer,
} from "./NoteElements";
import SearchInputBox from "../../Common/SearchInputBox";
import "./NoteApp.css";
import NoteList from "./NoteList";
import NoteDescription from "./NoteDescription";

const DUMMY_DATA = [
    {
        id: 1,
        title: "Exploring JWT Security and Vulnerabilities",
        description:
            "JSON Web Tokens (JWT) are widely used for authentication and authorization. However, like any technology, they have potential vulnerabilities that need to be understood and addressed.",
    },
    {
        id: 2,
        description:
            "We take the security of our website very seriously and appreciate the contributions of security researchers to help keep our website secure. If you discover a security vulnerability, please report it to us using the contact information provided below. We ask that you please do not publicly disclose the vulnerability until we have had a chance to investigate and address the issue.",
        pinned: true,
    },
    {
        id: 3,
        title: "What is two-factor authentication and how does it work?",
        pinned: false,
    },
];

const NoteApp = () => {
    const [notes, setNotes] = useState(DUMMY_DATA);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [pickedNote, setPickedNote] = useState({});
    const [needToAdd, setNeedToAdd] = useState(false);

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));
        if (savedNotes !== "") {
            setNotes((savedNotes) => {
                const sortNotes = savedNotes.sort((a, b) => {
                    if (a.pinned !== b.pinned) {
                        if (a.pinned === true) return -1;
                        return 1;
                    }
                    return 0;
                });
                return [...sortNotes];
            });
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
        setFilteredNotes(newFilteredNotes);
    }, [searchTerm, notes]);

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handlePickNote = (noteId) => {
        const pickedNote = notes.find((note) => note.id === noteId);
        setPickedNote(pickedNote !== -1 ? pickedNote : {});
    };
    const handlePinNote = (noteId) => {
        let needToHappen = true;
        setNotes((prevNotes) => {
            const pinnedNoteIndex = prevNotes.findIndex((note) => note.id === noteId);
            if (pinnedNoteIndex > -1 && needToHappen) {
                prevNotes[pinnedNoteIndex].pinned = !prevNotes[pinnedNoteIndex].pinned;
            }
            needToHappen = false;
            const sortNotes = prevNotes.sort((a, b) => {
                if (a.pinned !== b.pinned) {
                    if (a.pinned === true) return -1;
                    return 1;
                }
                return 0;
            });
            return [...sortNotes];
        });
    };
    const handleOpenAddNewNoteMode = () => {
        setNeedToAdd(true);
    };
    // const addNote = (text) => {
    //     const newNote = {
    //         text,
    //         id: nanoid(),
    //     };
    //     const newNotes = [...notes, newNote];
    //     setNotes(newNotes);
    // };

    const handleDataWhenDeleteNote = (id) => {
        const newNotes = notes?.filter((note) => note.id !== id);
        setNotes(newNotes);
    };
    const handleCloseMDEditorMode = () => {
        setNeedToAdd(false);
        setPickedNote({});
    };
    return (
        <NotesContainer>
            <NotesSidebarContainer>
                <NotesSidebarHeader>
                    <RxHamburgerMenu className="icon" size="24px" title="Menu" />
                    <NotesSidebarHeaderTitle>All Notes</NotesSidebarHeaderTitle>
                    <MdNoteAdd className="icon" size="24px" title="New" onClick={handleOpenAddNewNoteMode} />
                </NotesSidebarHeader>
                <SearchContainer>
                    <SearchInputBox
                        placeholder="Search all notes and tags"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                    />
                </SearchContainer>

                <NoteList onPin={handlePinNote} onPick={handlePickNote}>
                    {filteredNotes}
                </NoteList>
            </NotesSidebarContainer>
            <NoteDescription
                onPin={handlePinNote}
                onDelete={handleDataWhenDeleteNote}
                needToAdd={needToAdd}
                onCloseAddMode={handleCloseMDEditorMode}
            >
                {pickedNote}
            </NoteDescription>
        </NotesContainer>

        //     <NoteList notes={notes} handleAddNote={addNote} handleDeleteNote={deleteNote} />
    );
};

export default NoteApp;
