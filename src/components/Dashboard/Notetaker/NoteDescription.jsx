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

    return (
        <NotesDescriptionContainer>
            <NotesDescriptionHeader>
                {!needToAdd && !needToEdit && showNote.title && (
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
                    {needToAdd || needToEdit ? (
                        <MarkdownEditor content={needToEdit ? `# ${showNote.title}` : "# "} label="title" />
                    ) : (
                        <h1>{showNote.title}</h1>
                    )}
                </DescriptionTitle>
                <DescriptionContent>
                    {needToAdd || needToEdit ? (
                        <MarkdownEditor content={needToEdit ? showNote.description : ""} label="description" />
                    ) : (
                        <p>{showNote.description}</p>
                    )}
                </DescriptionContent>
            </NotesDescription>
        </NotesDescriptionContainer>
    );
};
export default NoteDescription;
