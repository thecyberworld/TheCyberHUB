import React from "react";

import {
    DetailsInputTimeLineContainer,
    DetailsTextInputTimeLineContainer,
    InputEditorIconContainer,
    TimePicking,
    TimeLineListItem,
} from "./ModifyElements";
import InputEditor from "../Common/InputEditor";
import TimePickerDisplay from "./TimePickerDisplay";
import { AiFillClockCircleIcon } from "./CommunityEventsElement";

const TimeLineListItemDisplay = ({ timeLineListItemObj, setTimeLineListItems, rangeDate }) => {
    const handleChangeInput = (label, content) => {
        setTimeLineListItems((prevTimeLine) => {
            const updateTimeLineItem = { ...prevTimeLine[timeLineListItemObj.id], [label]: content };
            return { ...prevTimeLine, [updateTimeLineItem.id]: { ...updateTimeLineItem } };
        });
    };
    const dateFieldType =
        new Date(rangeDate.to).getDate() - new Date(rangeDate.from).getDate() > 0 ? "pick date" : "show date";
    return (
        <TimeLineListItem>
            <DetailsInputTimeLineContainer>
                <TimePicking>
                    <InputEditorIconContainer inputType="time">
                        <AiFillClockCircleIcon />
                    </InputEditorIconContainer>
                    <TimePickerDisplay
                        rangeDate={rangeDate}
                        nestedObj
                        modifyObj={timeLineListItemObj}
                        setModifyObj={setTimeLineListItems}
                        dateFieldType={dateFieldType}
                    >
                        From:
                    </TimePickerDisplay>
                    <TimePickerDisplay
                        rangeDate={rangeDate}
                        nestedObj
                        modifyObj={timeLineListItemObj}
                        setModifyObj={setTimeLineListItems}
                        dateFieldType={dateFieldType}
                    >
                        To:
                    </TimePickerDisplay>
                </TimePicking>
            </DetailsInputTimeLineContainer>
            <DetailsInputTimeLineContainer>
                <DetailsTextInputTimeLineContainer>
                    <InputEditor
                        inputType="text"
                        label="name"
                        placeholder="Name / @Username"
                        onCopyChanges={handleChangeInput}
                        content={timeLineListItemObj.name}
                    />
                </DetailsTextInputTimeLineContainer>
                <DetailsTextInputTimeLineContainer>
                    <InputEditor
                        inputType="text"
                        label="topic"
                        placeholder="Topic"
                        onCopyChanges={handleChangeInput}
                        content={timeLineListItemObj.topic}
                    />
                </DetailsTextInputTimeLineContainer>
            </DetailsInputTimeLineContainer>

            <InputEditor
                inputType="text"
                label="description"
                placeholder="Description"
                onCopyChanges={handleChangeInput}
                content={timeLineListItemObj.description}
                isTextarea
            />
        </TimeLineListItem>
    );
};
export default TimeLineListItemDisplay;
