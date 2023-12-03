import React, { useEffect, useState } from "react";
import {
    DescriptionContent,
    DescriptionTitle,
    NotesDescription,
    NotesDescriptionContainer,
    NotesDescriptionHeader,
    NotesDescriptionIconsContainer,
} from "./NoteElements";
import { MdDeleteForever } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import NotePinning from "./NotePinning";
import { RiMore2Fill } from "react-icons/ri";
import MarkdownEditor from "../../Common/MarkdownEditor";

const NoteDescription = ({ children, onPin, onDelete, needToAdd }) => {
    const [showNote, setShowNote] = useState(children);
    const [needToEdit, setNeedToEdit] = useState(false);

    useEffect(() => {
        setShowNote(children);
    }, [children]);

    const handleDeleteNote = () => {
        onDelete(children.id);
        setShowNote({});
    };
    if (needToAdd) {
        return (
            <NotesDescriptionContainer>
                <NotesDescriptionHeader></NotesDescriptionHeader>
                <NotesDescription>
                    <DescriptionTitle>{needToAdd && <MarkdownEditor />}</DescriptionTitle>
                    <DescriptionContent>{needToAdd && <MarkdownEditor />}</DescriptionContent>
                </NotesDescription>
            </NotesDescriptionContainer>
        );
    }
    return (
        <NotesDescriptionContainer>
            <NotesDescriptionHeader>
                {showNote.title && (
                    <NotesDescriptionIconsContainer>
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
            </NotesDescriptionHeader>
            <NotesDescription>
                <DescriptionTitle>
                    {needToEdit ? <MarkdownEditor content={showNote.title} /> : showNote.title}
                </DescriptionTitle>
                <DescriptionContent>
                    {needToEdit ? <MarkdownEditor content={showNote.description} /> : showNote.description}
                </DescriptionContent>
            </NotesDescription>
        </NotesDescriptionContainer>
    );
};
export default NoteDescription;
