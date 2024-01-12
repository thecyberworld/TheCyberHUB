import React, { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import InputEditor from "../Common/InputEditor";
import { AiFillClockCircleIcon, MdLocationOnIcon } from "./CommunityEventsElement";
import { GoProjectSymlink } from "react-icons/go";
import { MdOutlineEventSeat } from "react-icons/md";

import {
    CreateEventActionsContainer,
    CreateEventCancelActionButton,
    CreateEventCancelActionText,
    CreateEventItem,
    CreateEventSaveActionButton,
    CreateEventSaveActionText,
    DayPickerContainer,
    DetailsInputContainer,
    EventLink,
    EventMaxParticipants,
    InputEditorIconContainer,
    LocationPicking,
    TimeInputLabel,
    TimePickerContainer,
    TimePicking,
} from "./CreateCommunityEventElement";

const CreateCommunityEvent = ({ setOpenCreatingNewEvent }) => {
    // const [eventObj, setEventObj] = useState({
    //     status: "upcoming",
    //     date: "",
    //     startTime: "",
    //     endTime: "",
    //     location: "",
    //     eventName: "",
    //     reschedule: false,
    //     eventDescription: "",
    //     eventLink: "",
    //     participants: [],
    //     maxParticipantNumber: 0,
    // });

    const [selectedDate, setSelectedDate] = useState();

    let footer = <p style={{ textAlign: "center" }}>Please pick a day.</p>;
    if (selectedDate) footer = <p style={{ textAlign: "center" }}>You Picked {format(selectedDate, "PP")}.</p>;

    return (
        <CreateEventItem>
            <DayPickerContainer>
                <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    footer={footer}
                    showOutsideDays
                    modifiersClassNames={{
                        selected: "selected-date",
                        today: "today-date",
                    }}
                />
            </DayPickerContainer>
            <DetailsInputContainer>
                <InputEditor inputType="text" content="" label="eventName" placeholder="Event Name" />
                <InputEditor inputType="text" content="" label="eventDescription" placeholder="Event Description" />
                <TimePicking>
                    <InputEditorIconContainer inputType="time">
                        <AiFillClockCircleIcon />
                    </InputEditorIconContainer>
                    <TimePickerContainer>
                        <TimeInputLabel>From:</TimeInputLabel>
                        <InputEditor inputType="time" content="" label="startTime" />
                    </TimePickerContainer>
                    <TimePickerContainer>
                        <TimeInputLabel>To:</TimeInputLabel>
                        <InputEditor inputType="time" content="" label="endTime" />
                    </TimePickerContainer>
                </TimePicking>
                <EventMaxParticipants>
                    <InputEditorIconContainer>
                        <MdOutlineEventSeat size="20px" />
                    </InputEditorIconContainer>
                    <InputEditor
                        inputType="number"
                        content=""
                        label="maxParticipantNumber"
                        placeholder="Max Participants"
                    />
                </EventMaxParticipants>
                <LocationPicking>
                    <InputEditorIconContainer>
                        <MdLocationOnIcon />
                    </InputEditorIconContainer>
                    <InputEditor inputType="text" content="" label="location" placeholder="Event Location" />
                </LocationPicking>
                <EventLink>
                    <InputEditorIconContainer>
                        <GoProjectSymlink size="20px" />
                    </InputEditorIconContainer>
                    <InputEditor inputType="url" content="" label="eventLink" placeholder="Event Link" />
                </EventLink>
            </DetailsInputContainer>

            <CreateEventActionsContainer>
                <CreateEventSaveActionButton>
                    <CreateEventSaveActionText>Save</CreateEventSaveActionText>
                </CreateEventSaveActionButton>
                <CreateEventCancelActionButton onClick={() => setOpenCreatingNewEvent(false)}>
                    <CreateEventCancelActionText>Cancel</CreateEventCancelActionText>
                </CreateEventCancelActionButton>
            </CreateEventActionsContainer>
        </CreateEventItem>
    );
};
export default CreateCommunityEvent;
