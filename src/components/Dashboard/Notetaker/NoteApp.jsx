import React, { useEffect, useState } from "react";
import { MdNoteAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

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
import { getNotes, noteReset, pinNote } from "../../../features/notes/notesSlice";
import LoadingSpinner from "../../Other/MixComponents/Spinner/LoadingSpinner";
import { CategorySidebar } from "./Category";

const NoteApp = () => {
    const dispatch = useDispatch();
    const { notes, isNoteLoading, isNoteError, noteMessage } = useSelector((state) => state.notes);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [pickedCategory, setPickedCategory] = useState("");
    const [pickedNote, setPickedNote] = useState({});
    const [needToAdd, setNeedToAdd] = useState(false);

    useEffect(() => {
        if (isNoteError) {
            console.log(noteMessage);
        }
        dispatch(getNotes()).then(({ payload }) => {
            if (payload.length > 0) {
                let pickedNote = payload.find((note) => note.pinned);
                if (pickedNote) {
                    setPickedCategory("Pinned Notes");
                    setPickedNote(
                        pickedNote.title.includes("UntitledNote") ? { ...pickedNote, title: "" } : pickedNote,
                    );
                } else {
                    pickedNote = payload.find((note) => !note.pinned);
                    setPickedCategory("Other Notes");
                    setPickedNote(
                        pickedNote.title.includes("UntitledNote") ? { ...pickedNote, title: "" } : pickedNote,
                    );
                }
            } else {
                setPickedCategory("Pinned Notes");
            }
        });
        return () => dispatch(noteReset());
    }, [dispatch, isNoteError, noteMessage]);

    useEffect(() => {
        const newFilteredNotes = notes?.filter((note) => {
            const searchedNote =
                note?.title?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
                note?.content?.toLowerCase().includes(searchTerm?.toLowerCase());
            if (!searchedNote) return false;
            if (pickedCategory === "Other Notes") {
                return !note.pinned;
            }
            if (pickedCategory === "Pinned Notes") {
                return note.pinned;
            }
            return note.category.toLowerCase() === pickedCategory.toLowerCase();
        });
        setFilteredNotes(newFilteredNotes);
    }, [searchTerm, notes, pickedCategory]);

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handlePickNote = (noteId) => {
        const pickedNote = notes.find((note) => note._id === noteId);
        setNeedToAdd(false);
        setPickedNote(
            pickedNote === -1
                ? {}
                : pickedNote.title.includes("UntitledNote")
                ? { ...pickedNote, title: "" }
                : pickedNote,
        );
    };
    const handlePinNote = (noteId) => {
        const pinnedNote = notes.find((note) => note._id === noteId);
        const noteData = {
            ...pinnedNote,
            pinned: !pinnedNote.pinned,
        };
        dispatch(pinNote({ id: noteId, noteData }));
    };
    const handleOpenAddNewNoteMode = () => {
        setNeedToAdd(true);
        setPickedNote({});
    };
    const handleCloseMDEditorMode = () => {
        setNeedToAdd(false);
        setPickedNote({});
    };

    return (
        <NotesContainer>
            <CategorySidebar pickedCategory={pickedCategory} onPick={setPickedCategory} />
            <NotesSidebarContainer>
                <NotesSidebarHeader>
                    <NotesSidebarHeaderTitle>{pickedCategory}</NotesSidebarHeaderTitle>
                </NotesSidebarHeader>
                <SearchContainer>
                    <SearchInputBox placeholder="Search Note" value={searchTerm} onChange={handleSearchTermChange} />
                    <MdNoteAdd
                        className="icon icon-add"
                        style={{ marginLeft: "5px", marginRight: "5px" }}
                        size="20px"
                        title="New Note"
                        onClick={handleOpenAddNewNoteMode}
                    />
                </SearchContainer>

                {isNoteLoading ? (
                    <LoadingSpinner />
                ) : (
                    <NoteList onPin={handlePinNote} onPick={handlePickNote} pickedNoteId={pickedNote._id}>
                        {filteredNotes}
                    </NoteList>
                )}
            </NotesSidebarContainer>
            <NoteDescription
                onPin={handlePinNote}
                needToAdd={needToAdd}
                onCloseAddMode={handleCloseMDEditorMode}
                onChangePickedNote={setPickedNote}
                pickedCategory={pickedCategory}
            >
                {pickedNote}
            </NoteDescription>
        </NotesContainer>
    );
};

export default NoteApp;
