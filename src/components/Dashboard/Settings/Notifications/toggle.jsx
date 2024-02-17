import React, { useState } from "react";
import "./Notification.css";

export default function Toggle({ className, handleClick }) {
    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
        console.log("function is called");
        setIsOn(!isOn);
        console.log(isOn);
    };

    return (
        <label className={`switch ${className}`}>
            <input
                type="checkbox"
                onClick={() => {
                    handleToggle();
                    handleClick();
                }}
            />
            <span className="slider" />
        </label>
    );
}
