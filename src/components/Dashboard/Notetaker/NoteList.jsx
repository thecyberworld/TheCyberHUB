import React, { useEffect } from "react";
import { NotesListContainer, NotesListNoFound } from "./NoteElements";
import NoteItem from "./NoteItem";
import { Reorder, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { notesReorder, updateNote } from "src/features/notes/notesSlice";

const NoteList = ({ children, onPick, onPin, pickedNoteId }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            console.log("testing of component unmount");
        };
    }, []);

    const sortByNoteId = (arr) => {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i].noteId > arr[j].noteId) {
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
            }
        }
        return arr;
    };

    const sortedNotes = sortByNoteId(children);

    const rearrangeNoteId = (arr, sortedNotes) => {
        return arr.map((item, index) => {
            return {
                ...item,
                noteId: sortedNotes[index].noteId,
            };
        });
    };

    const updateNoteId = (sortByNoteId) => {
        for (let i = 0; i < sortByNoteId.length; i++) {
            dispatch(
                updateNote({
                    id: sortByNoteId[i]._id,
                    noteData: sortByNoteId[i],
                }),
            );
        }
    };

    return (
        <NotesListContainer>
            <button className="bg-white" onClick={() => updateNoteId(sortedNotes)}>
                Update NoteId
            </button>
            {!sortedNotes.length && <NotesListNoFound>There Are No Notes</NotesListNoFound>}
            <Reorder.Group
                values={sortedNotes}
                onReorder={(newValues) => {
                    newValues = rearrangeNoteId(newValues, sortedNotes);
                    return dispatch(notesReorder(newValues));
                }}
            >
                {sortedNotes.map((note) => (
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
