import React, { useEffect, useState } from "react";
import { format } from "date-fns";

import { DisplayDate, TimeInputEditorContainer, TimeInputLabel, TimePickerContainer } from "./ModifyElements";
import InputEditor from "../Common/InputEditor";
import { AddZeroToDateString, setDateAndTime } from "../../utils/dateTimeRelatedFunctions";

const TimePickerDisplay = ({ children, rangeDate, showDate, setModifyObj, modifyObj, nestedObj = false }) => {
    const [time, setTime] = useState({ startTime: "", endTime: "" });
    const [isStartTime, setIsStartTime] = useState(true);

    useEffect(() => {
        if (modifyObj && modifyObj.startTime && modifyObj.endTime) {
            const startTimeDate = new Date(modifyObj.startTime);
            const endTimeDate = new Date(modifyObj.endTime);
            setTime({
                startTime: `${AddZeroToDateString(startTimeDate.getHours())}:${AddZeroToDateString(
                    startTimeDate.getMinutes(),
                )}`,
                endTime: `${AddZeroToDateString(endTimeDate.getHours())}:${AddZeroToDateString(
                    endTimeDate.getMinutes(),
                )}`,
            });
        }
    }, []);

    useEffect(() => {
        setIsStartTime(children === "From:");
    }, [children]);

    const handleUpdateTimeValue = (properyName, value) => {
        setModifyObj((prevEventObj) => {
            const houres = value.split(":")[0];
            const minutes = value.split(":")[1];
            if (nestedObj) {
                const updateTimeLineItem = {
                    ...prevEventObj[modifyObj.id],
                    [properyName]: setDateAndTime(
                        prevEventObj[modifyObj.id][properyName],
                        new Date().setHours(houres, minutes),
                    ),
                };
                return { ...prevEventObj, [updateTimeLineItem.id]: { ...updateTimeLineItem } };
            }
            return {
                ...prevEventObj,
                [properyName]: setDateAndTime(prevEventObj[properyName], new Date().setHours(houres, minutes)),
            };
        });
    };
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
                    onCopyChanges={handleUpdateTimeValue}
                />
            </TimeInputEditorContainer>
        </TimePickerContainer>
    );
};
export default TimePickerDisplay;
