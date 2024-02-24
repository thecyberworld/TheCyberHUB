import React, { useEffect, useState } from "react";

import {
    DetailsInputTimelineContainer,
    DetailsTextInputTimelineContainer,
    InputEditorIconContainer,
    TimePicking,
    TimelineListItem,
} from "./ModifyElements";
import InputEditor from "../Common/InputEditor";
import MultipleSelect from "../Common/MultipleSelect";
import TimePickerDisplay from "../Common/TimePickerDisplay";
import { AiFillClockCircleIcon } from "./CommunityEventsElement";

const topics = [
    "secure coding",
    "devOps practices",
    "open source collaboration",
    "cloud security",
    "vulnerability management",
    "automated security testing",
    "incident response",
    "container security",
    "regulatory compliance",
    "threat intelligence",
    "other",
];

const TimelineListItemDisplay = ({ timeLineListItemObj, setTimelineListItems, rangeDate }) => {
    const [selectedTopic, setSelectedTopic] = useState("");
    const [optionsValuesWithLabels, setOptionsValuesWithLabels] = useState([]);

    useEffect(() => {
        setOptionsValuesWithLabels(() => {
            return topics.map((topic) => {
                return { value: topic.toLowerCase(), label: topic.toLowerCase() };
            });
        });
    }, []);

    const handleChangeInput = (label, content) => {
        setTimelineListItems((prevTimeline) => {
            const updateTimelineItem = { ...prevTimeline[timeLineListItemObj.id], [label]: content };
            return { ...prevTimeline, [updateTimelineItem.id]: { ...updateTimelineItem } };
        });
    };
    const dateFieldType =
        new Date(rangeDate.to).getDate() - new Date(rangeDate.from).getDate() > 0 ? "pick date" : "show date";

    const handleSelectTopic = (topic) => {
        setSelectedTopic(topic);
        handleChangeInput("topic", topic);
    };

    return (
        <TimelineListItem>
            <DetailsInputTimelineContainer>
                <TimePicking>
                    <InputEditorIconContainer inputType="time">
                        <AiFillClockCircleIcon />
                    </InputEditorIconContainer>
                    <TimePickerDisplay
                        rangeDate={rangeDate}
                        nestedObj
                        modifyObj={timeLineListItemObj}
                        setModifyObj={setTimelineListItems}
                        dateFieldType={dateFieldType}
                    >
                        From:
                    </TimePickerDisplay>
                    <TimePickerDisplay
                        rangeDate={rangeDate}
                        nestedObj
                        modifyObj={timeLineListItemObj}
                        setModifyObj={setTimelineListItems}
                        dateFieldType={dateFieldType}
                    >
                        To:
                    </TimePickerDisplay>
                </TimePicking>
            </DetailsInputTimelineContainer>
            <DetailsInputTimelineContainer childElements={3}>
                <DetailsTextInputTimelineContainer>
                    <InputEditor
                        inputType="text"
                        label="title"
                        placeholder="Title"
                        onCopyChanges={handleChangeInput}
                        content={timeLineListItemObj.title}
                    />
                </DetailsTextInputTimelineContainer>
                <DetailsTextInputTimelineContainer>
                    <InputEditor
                        inputType="text"
                        label="program"
                        placeholder="Activity / Speaker (Full Name/@Username) "
                        onCopyChanges={handleChangeInput}
                        content={timeLineListItemObj.program}
                    />
                </DetailsTextInputTimelineContainer>
                <DetailsTextInputTimelineContainer>
                    <MultipleSelect
                        selectLabel="Topic"
                        selectedValue={selectedTopic}
                        onValueSelect={handleSelectTopic}
                        optionsValuesWithLabels={optionsValuesWithLabels}
                        defaultValue={timeLineListItemObj.topic}
                    />
                </DetailsTextInputTimelineContainer>
            </DetailsInputTimelineContainer>

            <InputEditor
                inputType="text"
                label="description"
                placeholder="Description"
                onCopyChanges={handleChangeInput}
                content={timeLineListItemObj.description}
                isTextarea
            />
        </TimelineListItem>
    );
};
export default TimelineListItemDisplay;
