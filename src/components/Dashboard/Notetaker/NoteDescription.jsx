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

const NoteDescription = ({ children, onPin, onDelete }) => {
    const [showNote, setShowNote] = useState(children);

    useEffect(() => {
        setShowNote(children);
    }, [children]);

    const handleDeleteNote = () => {
        onDelete(children.id);
        setShowNote({});
    };
    return (
        <NotesDescriptionContainer>
            <NotesDescriptionHeader>
                {showNote.title && (
                    <NotesDescriptionIconsContainer>
                        <BiSolidEdit className="icon" size="24px" title="Edit" />
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
                <DescriptionTitle>{showNote.title}</DescriptionTitle>
                <DescriptionContent>{showNote.description}</DescriptionContent>
            </NotesDescription>
        </NotesDescriptionContainer>
    );
};
export default NoteDescription;
