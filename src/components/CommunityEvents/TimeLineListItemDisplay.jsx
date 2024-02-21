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

const TimeLineListItemDisplay = ({ timeLineListItemObj, setTimeLineListItems }) => {
    const handleChangeInput = (label, content) => {
        setTimeLineListItems((prevTimeLine) => {
            const updateTimeLineItem = { ...prevTimeLine[timeLineListItemObj.id], [label]: content };
            return { ...prevTimeLine, [updateTimeLineItem.id]: { ...updateTimeLineItem } };
        });
    };
    // const pickDate = { status: true, startDay: 2, duration: 2 };
    return (
        <TimeLineListItem>
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
            <DetailsInputTimeLineContainer>
                <TimePicking>
                    <InputEditorIconContainer inputType="time">
                        <AiFillClockCircleIcon />
                    </InputEditorIconContainer>
                    <TimePickerDisplay nestedObj modifyObj={timeLineListItemObj} setModifyObj={setTimeLineListItems}>
                        From:
                    </TimePickerDisplay>
                    <TimePickerDisplay nestedObj modifyObj={timeLineListItemObj} setModifyObj={setTimeLineListItems}>
                        To:
                    </TimePickerDisplay>
                </TimePicking>
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
