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
    const textCleanFromTags = text.replace(/<[^>]+>/g, "");
    return textCleanFromTags.length > letters ? `${textCleanFromTags.slice(0, letters)}...` : textCleanFromTags;
};

const NoteItem = ({ id, title, description, pinned, onPick, onPin }) => {
    const [shortTitle, setShortTitle] = useState("");
    const [shortDescr, setShortDescr] = useState("");

    useEffect(() => {
        setShortTitle(shortText(title, 30));
        setShortDescr(shortText(description, 60));
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
