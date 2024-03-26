import React from "react";
import { NotesListContainer, NotesListNoFound } from "./NoteElements";
import NoteItem from "./NoteItem";
import { Reorder , motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { notesReorder } from "src/features/notes/notesSlice";

const NoteList = ({ children, onPick, onPin, pickedNoteId }) => {
    const dispatch = useDispatch();
    return (
        <NotesListContainer>
            {!children.length && <NotesListNoFound>There Are No Notes</NotesListNoFound>}
            <Reorder.Group
                values={children}
                onReorder={(newValues) => {
                    console.log(newValues);
                    return dispatch(notesReorder(newValues));
                }}
            >
                {children.map((note) => (
                    <Reorder.Item key={note._id} value={note}>
                        <motion.ul whileHover={{ scale: 0.9 }}>
                            <NoteItem
                                key={note._id}
                                {...note}
                                onPick={onPick}
                                onPin={onPin}
                                isPicked={note._id === pickedNoteId}
                            />
                        </motion.ul>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </NotesListContainer>
    );
};
export default NoteList;
