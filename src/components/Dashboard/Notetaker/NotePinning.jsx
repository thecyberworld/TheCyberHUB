import React from "react";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";

const NotePinning = ({ isPinned, onPin, noteId }) => {
    const pinDisplay = isPinned ? (
        <BsPinAngleFill className="icon icon-pin" size="24px" title="Unpin" onClick={() => onPin(noteId)} />
    ) : (
        <BsPinAngle className="icon icon-pin" size="24px" title="Pin" onClick={() => onPin(noteId)} />
    );
    return <>{pinDisplay}</>;
};
export default NotePinning;
