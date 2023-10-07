import { useState, React } from "react";
import './NoteApp.css'

const AddNote = ({ handleAddNote }) => {
    const [noteText, setNoteText] = useState("");
    const [characterLimit, setCharacterLimit] = useState(200);
    const [characterLimitError, setCharacterLimitError] = useState(false);

    const handleChange = (event) => {
        setNoteText(event.target.value);
        if (noteText.trim().length > characterLimit) {
            setCharacterLimitError(true);
        } else {
            setCharacterLimitError(false);
        }
    };

    const handleSaveClick = () => {
        if (noteText.trim().length > 0 && noteText.trim().length < characterLimit) {
            handleAddNote(noteText);
            setNoteText("");
        }
    };


    return (
        <div className="note">
            <textarea
                rows="8"
                cols="10"
                placeholder="Type to add a note..."
                value={noteText}
                onChange={handleChange}
            ></textarea>
            <div>
                <small className={characterLimitError ? "character-limit-error" : "character-limit"}>{characterLimit - noteText.length} characters remaining.</small>
                <button className="add-note-button" onClick={handleSaveClick}>Add</button>
            </div>
        </div>
    );
};

export default AddNote;
