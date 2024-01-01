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

const requiredCategories = [
    {
        name: "Pinned Notes",
        type: "pinned",
    },
    {
        name: "Other Notes",
        type: "other",
    },
];

const NoteApp = () => {
    const dispatch = useDispatch();
    const { notes, isNoteLoading, isNoteError, noteMessage } = useSelector((state) => state.notes);
    const { categories, isCategoryLoading, isCategoryError, categoryMessage } = useSelector(
        (state) => state.categories,
    );
    const [pickedCategory, setPickedCategory] = useState({});
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
        dispatch(getNotes()).then(({ payload }) => {
            if (payload.length > 0) {
                let pickedNote = payload.find((note) => note.pinned);
                if (pickedNote) {
                    setPickedCategory(requiredCategories[0]);
                    setPickedNote(
                        pickedNote.title.includes("UntitledNote") ? { ...pickedNote, title: "" } : pickedNote,
                    );
                } else {
                    pickedNote = payload.find((note) => !note.pinned);
                    setPickedCategory(requiredCategories[1]);
                    setPickedNote(
                        pickedNote.title.includes("UntitledNote") ? { ...pickedNote, title: "" } : pickedNote,
                    );
                }
            } else {
                setPickedCategory(requiredCategories[0]);
            }
        });
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
                requiredCategories={requiredCategories}
                setCopyCategoryOptionMode={setCategoryOptionMode}
                categories={categories}
                isCategoryLoading={isCategoryLoading}
                setPickedCategory={setPickedCategory}
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
            />

            <NoteDescription
                onPin={handlePinNote}
                needToAdd={needToAdd}
                onCloseAddMode={handleCloseMDEditorMode}
                onChangePickedNote={setPickedNote}
                pickedCategory={pickedCategory}
                requiredCategories={requiredCategories}
            >
                {pickedNote}
            </NoteDescription>
        </NotesContainer>
    );
};

export default NoteApp;
