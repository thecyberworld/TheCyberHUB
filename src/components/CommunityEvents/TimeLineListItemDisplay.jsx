import React from "react";

import {
    DetailsInputTimeLineContainer,
    DetailsTextInputTimeLineContainer,
    InputEditorIconContainer,
    TimePicking,
    TimeLineListItem,
} from "./ModifyElements";
import InputEditor from "src/components/Common/InputEditor";
import TimePickerDisplay from "./TimePickerDisplay";
import { AiFillClockCircleIcon } from "./CommunityEventsElement";

const TimeLineListItemDisplay = ({ timeLineListObj, setTimeLineListItems }) => {
    const handleChangeInput = (label, content) => {
        setTimeLineListItems((prevTimeLine) => {
            const updateTimeLineItem = { ...prevTimeLine[timeLineListObj.id], [label]: content };
            return { ...prevTimeLine, [updateTimeLineItem.id]: { ...updateTimeLineItem } };
        });
    };
    return (
        <TimeLineListItem>
            <DetailsInputTimeLineContainer>
                <DetailsTextInputTimeLineContainer>
                    <InputEditor
                        inputType="text"
                        label="name"
                        placeholder="Name / @Username"
                        onCopyChanges={handleChangeInput}
                        content={timeLineListObj.name}
                    />
                </DetailsTextInputTimeLineContainer>
                <DetailsTextInputTimeLineContainer>
                    <InputEditor
                        inputType="text"
                        label="topic"
                        placeholder="Topic"
                        onCopyChanges={handleChangeInput}
                        content={timeLineListObj.topic}
                    />
                </DetailsTextInputTimeLineContainer>
                <TimePicking>
                    <InputEditorIconContainer inputType="time">
                        <AiFillClockCircleIcon />
                    </InputEditorIconContainer>
                    <TimePickerDisplay time={timeLineListObj} handleUpdatePropertyValue={handleChangeInput}>
                        From:
                    </TimePickerDisplay>
                    <TimePickerDisplay time={timeLineListObj} handleUpdatePropertyValue={handleChangeInput}>
                        To:
                    </TimePickerDisplay>
                </TimePicking>
            </DetailsInputTimeLineContainer>
            <InputEditor
                inputType="text"
                label="description"
                placeholder="Description"
                onCopyChanges={handleChangeInput}
                content={timeLineListObj.description}
                isTextarea
            />
        </TimeLineListItem>
    );
};
export default TimeLineListItemDisplay;
