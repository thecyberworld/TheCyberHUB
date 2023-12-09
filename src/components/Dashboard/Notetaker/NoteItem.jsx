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
    const textCleanFromTags = text?.replace(/<[^>]+>|-|\[[^]]+|#/g, "");
    return textCleanFromTags?.length > letters ? `${textCleanFromTags.slice(0, letters)}...` : textCleanFromTags;
};

const NoteItem = ({ _id, title, content, pinned, onPick, onPin }) => {
    const [shortTitle, setShortTitle] = useState("");
    const [shortDescr, setShortDescr] = useState("");

    useEffect(() => {
        setShortTitle(() => (title ? shortText(title, 30) : `UntitledNote #${_id.substr(-10)}`));
        setShortDescr(() => (content ? shortText(content, 60) : "undescribedNote"));
    }, [title, content]);

    return (
        <NoteItemElementContainer>
            <NoteItemElement isPinned={pinned} onClick={() => onPick(_id)}>
                <NoteItemShortTitle>{shortTitle}</NoteItemShortTitle>
                <NoteItemShortDescription>{shortDescr}</NoteItemShortDescription>
            </NoteItemElement>
            <NoteItemPinningContainer isPinned={pinned}>
                <NotePinning isPinned={pinned} onPin={onPin} noteId={_id} />
            </NoteItemPinningContainer>
        </NoteItemElementContainer>
    );
};
export default NoteItem;
