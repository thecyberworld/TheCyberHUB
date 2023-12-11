import React, { useEffect, useState } from "react";
import {
    DescriptionContent,
    DescriptionDisplayTitle,
    DescriptionTitle,
    NotesDescription,
    NotesDescriptionContainer,
    NotesDescriptionHeader,
    NotesDescriptionIconsContainer,
} from "./NoteElements";
import { MdDeleteForever, MdCancel } from "react-icons/md";
import { BiSolidEdit, BiSolidSave } from "react-icons/bi";
import NotePinning from "./NotePinning";
import { RiMore2Fill } from "react-icons/ri";
import MarkdownEditor from "../../Common/MarkdownEditor";
import InputEditor from "../../Common/InputEditor";
import { useDispatch } from "react-redux";
import { createNote, updateNote, deleteNote } from "../../../features/notes/notesSlice";

const NoteDescription = ({ children, onPin, needToAdd, onCloseAddMode, onChangePickedNote }) => {
    const dispatch = useDispatch();
    const [showNote, setShowNote] = useState(children || {});
    const [needToEdit, setNeedToEdit] = useState(false);
    useEffect(() => {
        setShowNote(children);
        setNeedToEdit(false);
    }, [children]);

    const handleDeleteNote = () => {
        dispatch(deleteNote(children._id));
        setShowNote({});
    };
    const handleClose = () => {
        if (needToEdit) {
            setShowNote(children);
            setNeedToEdit(false);
            return;
        }
        onCloseAddMode(false);
        setShowNote({});
    };
    const handleCopyNoteData = (label, content) => {
        setShowNote((prevCopyNote) => {
            if (label === "description") label = "content";
            return {
                ...prevCopyNote,
                [label]: content,
            };
        });
    };
    const handleSaveNote = (newNote) => {
        if (!newNote.title && !newNote.content) {
            dispatch(deleteNote(newNote._id));
            onChangePickedNote({});
            handleClose();
            return;
        }
        if (needToEdit) {
            dispatch(updateNote({ id: children._id, noteData: newNote }));
        } else if (needToAdd) {
            dispatch(createNote(newNote));
        }
        onChangePickedNote(newNote);
        handleClose();
    };
    return (
        <NotesDescriptionContainer>
            <NotesDescriptionHeader>
                {!needToAdd && !needToEdit && (showNote.title || showNote.content) && (
                    <NotesDescriptionIconsContainer icons={3}>
                        <BiSolidEdit className="icon" size="24px" title="Edit" onClick={setNeedToEdit} />
                        <NotePinning isPinned={showNote.pinned} onPin={onPin} noteId={showNote._id} />
                        <MdDeleteForever
                            className="icon icon-delete"
                            size="24px"
                            title="Delete"
                            onClick={handleDeleteNote}
                        />
                        <RiMore2Fill className="icon" size="24px" title="More" />
                    </NotesDescriptionIconsContainer>
                )}
                {(needToAdd || needToEdit) && (
                    <NotesDescriptionIconsContainer icons={2}>
                        <BiSolidSave
                            className="icon icon-save"
                            size="24px"
                            title="Save"
                            onClick={() => handleSaveNote(showNote)}
                        />
                        <MdCancel className="icon icon-cancel" size="24px" title="Cancel" onClick={handleClose} />
                        <RiMore2Fill className="icon" size="24px" title="More" />
                    </NotesDescriptionIconsContainer>
                )}
            </NotesDescriptionHeader>
            <NotesDescription>
                <DescriptionTitle>
                    {needToAdd || needToEdit ? (
                        <InputEditor
                            label="title"
                            content={needToEdit && showNote.title ? showNote.title : ""}
                            onCopyChanges={handleCopyNoteData}
                        />
                    ) : (
                        <DescriptionDisplayTitle>
                            {showNote.title || (showNote._id ? `UntitledNote #${showNote._id.substr(-10)}` : "")}
                        </DescriptionDisplayTitle>
                    )}
                </DescriptionTitle>
                <DescriptionContent>
                    {needToAdd || needToEdit ? (
                        <MarkdownEditor
                            content={needToEdit && showNote.content ? showNote.content : ""}
                            label="description"
                            onCopyChanges={handleCopyNoteData}
                            pageName="notes"
                        />
                    ) : (
                        <MarkdownEditor
                            content={showNote.content || (showNote._id ? `undescribedNote` : "")}
                            previewModeOnly
                            pageName="notes"
                        />
                    )}
                </DescriptionContent>
            </NotesDescription>
        </NotesDescriptionContainer>
    );
};
export default NoteDescription;
