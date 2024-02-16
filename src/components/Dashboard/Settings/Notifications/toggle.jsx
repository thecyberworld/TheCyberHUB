import React, { useState } from "react";
import "./Notification.css";

export default function Toggle() {
    let [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
        console.log("function is called");
        isOn = !isOn;
        setIsOn(isOn);
        console.log(isOn);
    };

    return (
        <label className="switch">
            <input type="checkbox" onClick={handleToggle} />
            <span className="slider" />
        </label>
    );
}
