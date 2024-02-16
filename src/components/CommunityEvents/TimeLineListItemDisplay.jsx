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

const TimeLineListItemDisplay = ({ timeLineListObj }) => {
    return (
        <TimeLineListItem>
            <DetailsInputTimeLineContainer>
                <DetailsTextInputTimeLineContainer>
                    <InputEditor
                        inputType="text"
                        label="name"
                        placeholder="Name / @Username"
                        onCopyChanges={() => {}}
                        content={""}
                    />
                </DetailsTextInputTimeLineContainer>
                <DetailsTextInputTimeLineContainer>
                    <InputEditor
                        inputType="text"
                        label="topic"
                        placeholder="Topic"
                        onCopyChanges={() => {}}
                        content={""}
                    />
                </DetailsTextInputTimeLineContainer>
                <TimePicking>
                    <InputEditorIconContainer inputType="time">
                        <AiFillClockCircleIcon />
                    </InputEditorIconContainer>
                    <TimePickerDisplay time={timeLineListObj.startTime} handleUpdatePropertyValue={() => {}}>
                        From:
                    </TimePickerDisplay>
                    <TimePickerDisplay time={timeLineListObj.endTime} handleUpdatePropertyValue={() => {}}>
                        To:
                    </TimePickerDisplay>
                </TimePicking>
            </DetailsInputTimeLineContainer>
            <InputEditor
                inputType="text"
                label="description"
                placeholder="Short Description"
                onCopyChanges={() => {}}
                content={""}
            />
        </TimeLineListItem>
    );
};
export default TimeLineListItemDisplay;
