import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import InputEditor from "../Common/InputEditor";
import { AiFillClockCircleIcon } from "./CommunityEventsElement";
import { GoProjectSymlink } from "react-icons/go";
import { MdOutlineEventSeat } from "react-icons/md";

import {
    ModifyEventActionsContainer,
    ModifyEventCancelActionButton,
    ModifyEventCancelActionText,
    ModifyEventItem,
    ModifyEventSaveActionButton,
    ModifyEventSaveActionText,
    DayPickerContainer,
    DetailsInputContainer,
    EventLink,
    EventLinkEditor,
    EventMaxParticipants,
    InputEditorIconContainer,
    TimeInputLabel,
    TimePickerContainer,
    TimePicking,
} from "./ModifyCommunityEventElement";
import { toast } from "react-toastify";

const validURL = (str) => {
    const pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
        "i",
    ); // fragment locator
    return !!pattern.test(str);
};
const dateFormat = (dateObj) => {
    const month = dateObj.getMonth() + 1;
    let monthString = `${month}`;
    if (month < 10) monthString = `0${month}`;
    return `${dateObj.getFullYear()}-${monthString}-${dateObj.getDate()}`;
};
const ModifyCommunityEvent = ({ setOpenCreatingNewEvent, onModify, modifyEvent, setModifyEventId, modifyEventId }) => {
    const [eventObj, setEventObj] = useState(
        modifyEvent || {
            status: "approved",
            date: "",
            startTime: "",
            endTime: "",
            location: "Online",
            name: "",
            reschedule: false,
            description: "",
            link: "",
            participants: [],
            maxParticipantNumber: 0,
        },
    );
    useEffect(() => {
        if (modifyEventId) {
            setEventObj({ ...modifyEvent, date: new Date(modifyEvent.date) });
        }
    }, []);
    const handleUpdateEventPropertyValue = (properyName, value) => {
        setEventObj((prevEventObj) => {
            return {
                ...prevEventObj,
                [properyName]: value,
            };
        });
    };

    let footer = <p style={{ textAlign: "center" }}>Please pick a day.</p>;
    if (eventObj.date && eventObj.date instanceof Date)
        footer = <p style={{ textAlign: "center" }}>You Picked {format(eventObj.date, "PP")}.</p>;

    const handleCloseChangeMode = () => {
        setOpenCreatingNewEvent(false);
        setModifyEventId("");
    };

    const handleSaveChanges = () => {
        if (
            eventObj.date &&
            eventObj.date instanceof Date &&
            eventObj.startTime &&
            eventObj.endTime &&
            eventObj.name &&
            eventObj.name.length > 4 &&
            eventObj.description &&
            eventObj.description.length > 10 &&
            eventObj.link &&
            validURL(eventObj.link) &&
            eventObj.maxParticipantNumber > 0
        ) {
            eventObj.date = dateFormat(eventObj.date);
            onModify(eventObj, modifyEventId);
            handleCloseChangeMode();
        } else {
            toast.error(
                "There is a validation error, make sure you set all the values properly. Note: The Event Name needs to be more than 4 characters and The Event Description more than 10 characters ",
            );
        }
    };

    return (
        <ModifyEventItem>
            <DayPickerContainer>
                <DayPicker
                    mode="single"
                    selected={eventObj.date}
                    onSelect={(selectedDateValue) => handleUpdateEventPropertyValue("date", selectedDateValue)}
                    footer={footer}
                    showOutsideDays
                    modifiersClassNames={{
                        selected: "selected-date",
                        today: "today-date",
                    }}
                />
            </DayPickerContainer>
            <DetailsInputContainer>
                <InputEditor
                    inputType="text"
                    content={eventObj.name}
                    label="name"
                    placeholder="Event Name"
                    onCopyChanges={handleUpdateEventPropertyValue}
                />
                <InputEditor
                    inputType="text"
                    content={eventObj.description}
                    label="description"
                    placeholder="Event Description"
                    onCopyChanges={handleUpdateEventPropertyValue}
                />
                <TimePicking>
                    <InputEditorIconContainer inputType="time">
                        <AiFillClockCircleIcon />
                    </InputEditorIconContainer>
                    <TimePickerContainer>
                        <TimeInputLabel>From:</TimeInputLabel>
                        <InputEditor
                            inputType="time"
                            content={eventObj.startTime}
                            label="startTime"
                            onCopyChanges={handleUpdateEventPropertyValue}
                        />
                    </TimePickerContainer>
                    <TimePickerContainer>
                        <TimeInputLabel>To:</TimeInputLabel>
                        <InputEditor
                            inputType="time"
                            content={eventObj.endTime}
                            label="endTime"
                            onCopyChanges={handleUpdateEventPropertyValue}
                        />
                    </TimePickerContainer>
                </TimePicking>
                <EventMaxParticipants>
                    <InputEditorIconContainer>
                        <MdOutlineEventSeat size="20px" />
                    </InputEditorIconContainer>
                    <InputEditor
                        inputType="number"
                        content={eventObj.maxParticipantNumber}
                        label="maxParticipantNumber"
                        placeholder="Max Participants"
                        onCopyChanges={handleUpdateEventPropertyValue}
                    />
                </EventMaxParticipants>

                {/* we host locations only online so we don't need a location picker */
                /* <LocationPicking>
                    <InputEditorIconContainer>
                        <MdLocationOnIcon />
                    </InputEditorIconContainer>
                    <InputEditor
                        inputType="text"
                        content={eventObj.location}
                        label="location"
                        placeholder="Event Location"
                        onCopyChanges={handleUpdateEventPropertyValue}
                    />
                </LocationPicking> */}
                <EventLink>
                    <InputEditorIconContainer>
                        <GoProjectSymlink size="20px" />
                    </InputEditorIconContainer>
                    <EventLinkEditor>
                        <InputEditor
                            inputType="url"
                            content={eventObj.link}
                            label="link"
                            placeholder="https://www.eventlink.com"
                            onCopyChanges={handleUpdateEventPropertyValue}
                        />
                    </EventLinkEditor>
                </EventLink>
            </DetailsInputContainer>

            <ModifyEventActionsContainer>
                <ModifyEventSaveActionButton onClick={handleSaveChanges}>
                    <ModifyEventSaveActionText>Save</ModifyEventSaveActionText>
                </ModifyEventSaveActionButton>
                <ModifyEventCancelActionButton onClick={handleCloseChangeMode}>
                    <ModifyEventCancelActionText>Cancel</ModifyEventCancelActionText>
                </ModifyEventCancelActionButton>
            </ModifyEventActionsContainer>
        </ModifyEventItem>
    );
};
export default ModifyCommunityEvent;
