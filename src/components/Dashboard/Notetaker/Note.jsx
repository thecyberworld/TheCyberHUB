import React from "react";

const Note = ({ id, text, handleDeleteNote }) => {
    console.log(id);
    return (
        <div>
            <p>{text}</p>
            <button onClick={() => handleDeleteNote(id)}>Delete Note</button>
        </div>
    );
};

export default Note;
