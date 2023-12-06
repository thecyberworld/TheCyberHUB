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
import { noteAdd, noteEdit, noteRemove } from "../../../features/notes/notesSlice";

const NoteDescription = ({ children, onPin, needToAdd, onCloseAddMode, onChangePickedNote }) => {
    const dispatch = useDispatch();
    const [showNote, setShowNote] = useState(children);
    const [needToEdit, setNeedToEdit] = useState(false);
    useEffect(() => {
        setShowNote(children);
    }, [children]);

    const handleDeleteNote = () => {
        dispatch(noteRemove(children.id));
        setShowNote({});
    };
    const handleClose = () => {
        if (needToEdit) return setNeedToEdit(false);
        onCloseAddMode(false);
        setShowNote({});
    };
    const handleCopyNoteData = (label, content) => {
        setShowNote((prevCopyNote) => {
            return {
                ...prevCopyNote,
                [label]: content,
            };
        });
    };
    const handleSaveNote = (newNote) => {
        if (!newNote.title && !newNote.description) {
            dispatch(noteRemove(newNote.id));
            onChangePickedNote({});
            handleClose();
            return;
        }
        if (needToEdit) {
            dispatch(noteEdit({ ...newNote, id: children.id }));
        } else if (needToAdd) {
            dispatch(noteAdd(newNote));
        }
        onChangePickedNote(newNote);
        handleClose();
    };
    return (
        <NotesDescriptionContainer>
            <NotesDescriptionHeader>
                {!needToAdd && !needToEdit && (showNote.title || showNote.description) && (
                    <NotesDescriptionIconsContainer icons={3}>
                        <BiSolidEdit className="icon" size="24px" title="Edit" onClick={setNeedToEdit} />
                        <NotePinning isPinned={showNote.pinned} onPin={onPin} noteId={showNote.id} />
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
                            {showNote.title || (showNote.id ? `UntitledNote #${showNote.id.substr(0, 5)}` : "")}
                        </DescriptionDisplayTitle>
                    )}
                </DescriptionTitle>
                <DescriptionContent>
                    {needToAdd || needToEdit ? (
                        <MarkdownEditor
                            content={needToEdit && showNote.description ? showNote.description : ""}
                            label="description"
                            onCopyChanges={handleCopyNoteData}
                        />
                    ) : (
                        <MarkdownEditor
                            content={showNote.description || (showNote.id ? `undescribedNote` : "")}
                            previewModeOnly
                        />
                    )}
                </DescriptionContent>
            </NotesDescription>
        </NotesDescriptionContainer>
    );
};
export default NoteDescription;
