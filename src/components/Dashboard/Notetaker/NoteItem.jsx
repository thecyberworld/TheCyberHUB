import React from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import {
    NoteItemElement,
    NoteItemElementContainer,
    NoteItemPinningContainer,
    NoteItemShortTitle,
} from "./NoteElements";
import NotePinning from "./NotePinning";
import { motion } from "framer-motion";
// import { Reorder } from "framer-motion";
// import { getNotes, noteReset } from "src/features/notes/notesSlice";

const NoteItem = ({ _id, title, pinned, onPick, onPin, isPicked }) => {
    // const dispatch = useDispatch();
    // const { notes, isNoteError, noteMessage } = useSelector((state) => state.notes);
    // useEffect(() => {
    //     dispatch(getNotes());
    //     return () => dispatch(noteReset());
    // }, [dispatch, isNoteError, noteMessage]);
    return (
        // <Reorder.Group axis="y" values={notes} onReorder={(newValues)=>dispatch(notesReorder(newValues))} >
        <motion.div whileHover={{ scale: 0.9 }}>
            <NoteItemElementContainer>
                <NoteItemElement isPinned={pinned} onClick={() => onPick(_id)} isPicked={isPicked}>
                    <NoteItemShortTitle>{title.slice(0, 23)}</NoteItemShortTitle>
                </NoteItemElement>
                <NoteItemPinningContainer isPinned={pinned}>
                    <NotePinning isPinned={pinned} onPin={onPin} noteId={_id} />
                </NoteItemPinningContainer>
            </NoteItemElementContainer>
        </motion.div>
        // </Reorder.Group>
    );
};
export default NoteItem;
