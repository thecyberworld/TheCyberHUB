import React, { useEffect, useState } from "react";
import {
    NoteItemElement,
    NoteItemElementContainer,
    NoteItemPinningContainer,
    NoteItemShortDescription,
    NoteItemShortTitle,
} from "./NoteElements";
import NotePinning from "./NotePinning";

const shortText = (text, letters) => {
    const textCleanFromTags = text?.replace(/<[^>]+>/g, "");
    return textCleanFromTags?.length > letters ? `${textCleanFromTags.slice(0, letters)}...` : textCleanFromTags;
};

const NoteItem = ({ id, title, description, pinned, onPick, onPin }) => {
    const [shortTitle, setShortTitle] = useState("");
    const [shortDescr, setShortDescr] = useState("");

    useEffect(() => {
        setShortTitle(() => (title ? shortText(title, 30) : `UntitledNote #${id.substr(0, 5)}`));
        setShortDescr(() => (description ? shortText(description, 60) : "undescribedNote"));
    }, [title, description]);

    return (
        <NoteItemElementContainer>
            <NoteItemElement isPinned={pinned} onClick={() => onPick(id)}>
                <NoteItemShortTitle>{shortTitle}</NoteItemShortTitle>
                <NoteItemShortDescription>{shortDescr}</NoteItemShortDescription>
            </NoteItemElement>
            <NoteItemPinningContainer isPinned={pinned}>
                <NotePinning isPinned={pinned} onPin={onPin} noteId={id} />
            </NoteItemPinningContainer>
        </NoteItemElementContainer>
    );
};
export default NoteItem;
