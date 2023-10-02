import { useState, React } from "react";

const AddNote = ({ handleAddNote }) => {
    const [noteText, setNoteText] = useState("");
    const [characterLimit, setCharacterLimit] = useState(200);

    const handleChange = (event) => {
        setNoteText(event.target.value);
    };

    const handleSaveClick = () => {
        if (noteText.trim().length > 0) {
            handleAddNote(noteText);
            setNoteText("");
        }
    };

    return (
        <div>
            <textarea
                rows="8"
                cols="10"
                placeholder="Type to add a note..."
                value={noteText}
                onChange={handleChange}
            ></textarea>
            <div>
                <small>{characterLimit - noteText.length} characters remaining.</small>
                <button onClick={handleSaveClick}>Save</button>
            </div>
        </div>
    );
};

export default AddNote;
