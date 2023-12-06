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
import { useDispatch, useSelector } from "react-redux";
import { notePin } from "../../../features/notes/notesSlice";

const NoteApp = () => {
    const dispatch = useDispatch();
    const { notes } = useSelector(({ notes }) => notes);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [pickedNote, setPickedNote] = useState({});
    const [needToAdd, setNeedToAdd] = useState(false);

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
        dispatch(notePin(noteId));
    };
    const handleOpenAddNewNoteMode = () => {
        setNeedToAdd(true);
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
                needToAdd={needToAdd}
                onCloseAddMode={handleCloseMDEditorMode}
                onChangePickedNote={setPickedNote}
            >
                {pickedNote}
            </NoteDescription>
        </NotesContainer>
    );
};

export default NoteApp;
