import React, { useEffect, useState } from "react";
import {
    NoteItemElement,
    NoteItemElementContainer,
    NoteItemPinningContainer,
    NoteItemShortDescription,
    NoteItemShortTitle,
} from "./NoteElements";
import NotePinning from "./NotePinning";

const cleanFromTags = (text) => {
    return text?.replace(/<[^>]+>|-|\[[^]]+|#/g, "").replace(/!\[(.*?)\]\([^)]*\)/g, "$1", "");
};
const shortText = (text, letters) => {
    return text?.length > letters ? `${text.slice(0, letters)}...` : text;
};

const NoteItem = ({ _id, title, content, pinned, onPick, onPin, isPicked }) => {
    const [shortTitle, setShortTitle] = useState("");
    const [shortDescr, setShortDescr] = useState("");

    useEffect(() => {
        setShortTitle(() => title && shortText(title, 25));
        setShortDescr(() => {
            if (!content) return "(Empty)";
            const cleanContent = cleanFromTags(content);
            return shortText(cleanContent, 60);
        });
    }, [title, content]);

    return (
        <NoteItemElementContainer>
            <NoteItemElement isPinned={pinned} onClick={() => onPick(_id)} isPicked={isPicked}>
                <NoteItemShortTitle>{shortTitle}</NoteItemShortTitle>
                <NoteItemShortDescription empty={shortDescr === "(Empty)"}>{shortDescr}</NoteItemShortDescription>
            </NoteItemElement>
            <NoteItemPinningContainer isPinned={pinned}>
                <NotePinning isPinned={pinned} onPin={onPin} noteId={_id} />
            </NoteItemPinningContainer>
        </NoteItemElementContainer>
    );
};
export default NoteItem;
