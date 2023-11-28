import React, { useEffect, useState } from "react";
import { NoteItemElement, NoteItemShortDescr, NoteItemShortTitle } from "./NoteElements";

const shortText = (text, letters) => {
    return text.length > letters ? `${text.slice(0, letters)}...` : text;
};

const NoteItem = ({ title, descr }) => {
    const [shortTitle, setShortTitle] = useState("");
    const [shortDescr, setShortDescr] = useState("");

    useEffect(() => {
        setShortTitle(shortText(title, 35));
        setShortDescr(shortText(descr, 70));
    }, [title, descr]);

    return (
        <NoteItemElement>
            <NoteItemShortTitle>{shortTitle}</NoteItemShortTitle>
            <NoteItemShortDescr>{shortDescr}</NoteItemShortDescr>
        </NoteItemElement>
    );
};
export default NoteItem;
