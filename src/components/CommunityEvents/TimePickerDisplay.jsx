import React, { useEffect, useState } from "react";
import { format } from "date-fns";

import { DisplayDate, TimeInputEditorContainer, TimeInputLabel, TimePickerContainer } from "./ModifyElements";
import InputEditor from "../Common/InputEditor";

const TimePickerDisplay = ({ children, rangeDate, time, handleUpdatePropertyValue, showDate }) => {
    const [isStartTime, setIsStartTime] = useState(true);

    useEffect(() => {
        setIsStartTime(children === "From:");
    }, [children]);

    return (
        <TimePickerContainer>
            <TimeInputLabel>{children}</TimeInputLabel>
            {showDate && (
                <DisplayDate>
                    {isStartTime
                        ? rangeDate?.from
                            ? format(rangeDate?.from, "yyyy-MM-dd")
                            : "yyyy-MM-dd"
                        : rangeDate?.to
                        ? format(rangeDate?.to, "yyyy-MM-dd")
                        : "yyyy-MM-dd"}
                </DisplayDate>
            )}
            <TimeInputEditorContainer showDate={showDate}>
                <InputEditor
                    inputType="time"
                    content={isStartTime ? time?.startTime : time?.endTime}
                    label={isStartTime ? "startTime" : "endTime"}
                    onCopyChanges={handleUpdatePropertyValue}
                />
            </TimeInputEditorContainer>
        </TimePickerContainer>
    );
};
export default TimePickerDisplay;
