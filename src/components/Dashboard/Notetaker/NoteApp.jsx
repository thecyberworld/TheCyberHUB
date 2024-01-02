import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NotesContainer } from "./NoteElements";
import "./NoteApp.css";
import NoteDescription from "./NoteDescription";
import { getNotes, noteReset, pinNote } from "../../../features/notes/notesSlice";
import { CategorySidebar } from "./Category";
import NoteSidebar from "./NoteSidebar";
import { toast } from "react-toastify";
import { categoryReset, getCategories } from "../../../features/notes/category/categorySlice";

const defaultCategory = {
    name: "All Notes",
};

const NoteApp = () => {
    const dispatch = useDispatch();
    const { notes, isNoteLoading, isNoteError, noteMessage } = useSelector((state) => state.notes);
    const { categories, isCategoryLoading, isCategoryError, categoryMessage } = useSelector(
        (state) => state.categories,
    );
    const [pickedCategory, setPickedCategory] = useState(defaultCategory);
    const [pickedNote, setPickedNote] = useState({});
    const [categoryOptionMode, setCategoryOptionMode] = useState(false);
    const [needToAdd, setNeedToAdd] = useState(false);

    useEffect(() => {
        if (isCategoryError) {
            toast.error(categoryMessage);
            console.log(categoryMessage);
        }
        dispatch(getCategories());
        return () => dispatch(categoryReset());
    }, [dispatch, isCategoryError, categoryMessage]);

    useEffect(() => {
        if (categoryOptionMode || isCategoryLoading) return;
        if (isNoteError) {
            console.log(noteMessage);
        }
        dispatch(getNotes());
        return () => dispatch(noteReset());
    }, [dispatch, isNoteError, noteMessage, categoryOptionMode, isCategoryLoading]);

    const handleCloseMDEditorMode = () => {
        setNeedToAdd(false);
        setPickedNote({});
    };

    const handlePinNote = (noteId) => {
        const pinnedNote = notes.find((note) => note._id === noteId);
        const noteData = {
            ...pinnedNote,
            pinned: !pinnedNote.pinned,
        };
        dispatch(pinNote({ id: noteId, noteData }));
    };

    return (
        <NotesContainer>
            <CategorySidebar
                pickedCategory={pickedCategory}
                onPick={setPickedCategory}
                onUnpickNote={handleCloseMDEditorMode}
                setCopyCategoryOptionMode={setCategoryOptionMode}
                categories={categories}
                isCategoryLoading={isCategoryLoading}
                defaultCategory={defaultCategory}
            />
            <NoteSidebar
                categoryOptionMode={categoryOptionMode}
                pickedCategory={pickedCategory}
                pickedNote={pickedNote}
                onPickNote={setPickedNote}
                onNeedToAddNote={setNeedToAdd}
                onPinNote={handlePinNote}
                notes={notes}
                isNoteLoading={isNoteLoading}
                isCategoryLoading={isCategoryLoading}
                defaultCategory={defaultCategory}
            />

            <NoteDescription
                onPin={handlePinNote}
                needToAdd={needToAdd}
                onCloseAddMode={handleCloseMDEditorMode}
                onChangePickedNote={setPickedNote}
                pickedCategory={pickedCategory}
                defaultCategory={defaultCategory}
            >
                {pickedNote}
            </NoteDescription>
        </NotesContainer>
    );
};

export default NoteApp;
