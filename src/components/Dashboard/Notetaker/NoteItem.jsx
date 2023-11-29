import React, { useEffect, useState } from "react";
import { NoteItemElement, NoteItemShortDescription, NoteItemShortTitle } from "./NoteElements";

const shortText = (text, letters) => {
    const textCleanFromTags = text.replace(/<[^>]+>/g, "");
    return textCleanFromTags.length > letters ? `${textCleanFromTags.slice(0, letters)}...` : textCleanFromTags;
};

const NoteItem = ({ id, title, description, onPick }) => {
    const [shortTitle, setShortTitle] = useState("");
    const [shortDescr, setShortDescr] = useState("");

    useEffect(() => {
        setShortTitle(shortText(title, 30));
        setShortDescr(shortText(description, 60));
    }, [title, description]);

    return (
        <NoteItemElement onClick={() => onPick(id)}>
            <NoteItemShortTitle>{shortTitle}</NoteItemShortTitle>
            <NoteItemShortDescription>{shortDescr}</NoteItemShortDescription>
        </NoteItemElement>
    );
};
export default NoteItem;
