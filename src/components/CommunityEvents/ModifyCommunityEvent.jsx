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
    DisplayDate,
    TimeInputEditorContainer,
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
const setDateAndTime = (date, time) => {
    const newDate = date ? new Date(date) : new Date();
    const newTime = time ? new Date(time) : newDate;
    return new Date(
        newDate?.getFullYear(),
        newDate?.getMonth(),
        newDate?.getDate(),
        newTime?.getHours(),
        newTime?.getMinutes(),
    );
};
const AddZeroToDateString = (dateValue) => {
    return +dateValue < 10 ? `0${dateValue}` : dateValue;
};
const ModifyCommunityEvent = ({ setOpenCreatingNewEvent, onModify, modifyEvent, setModifyEventId, modifyEventId }) => {
    const [eventObj, setEventObj] = useState(
        modifyEvent || {
            status: "approved",
            startTime: "",
            endTime: "",
            location: "Online",
            name: "",
            reschedule: false,
            description: "",
            link: "",
            participants: [],
            maxParticipantsNumber: 0,
        },
    );

    const [rangeDate, setRangeDate] = useState({ from: "", to: "" });
    const [time, setTime] = useState({ startTime: "", endTime: "" });
    useEffect(() => {
        if (modifyEventId) {
            const startTimeDate = new Date(modifyEvent.startTime);
            const endTimeDate = new Date(modifyEvent.endTime);
            setEventObj({
                ...modifyEvent,
                startTime: startTimeDate,
                endTime: endTimeDate,
            });
            setRangeDate({
                from: new Date(modifyEvent.startTime).setHours(0, 0, 0),
                to: new Date(modifyEvent.endTime).setHours(0, 0, 0),
            });
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
    const handleUpdateEventPropertyValue = (properyName, value) => {
        setEventObj((prevEventObj) => {
            if (properyName === "rangeDate") {
                if (value && !value.to) value.to = value.from;
                if (value && !value.from) value.from = value.to;
                setRangeDate(value);
                return {
                    ...prevEventObj,
                    startTime: value ? setDateAndTime(value.from, prevEventObj.startTime) : prevEventObj.startTime,
                    endTime: value ? setDateAndTime(value.to, prevEventObj.endTime) : prevEventObj.endTime,
                };
            }
            if (properyName.includes("Time")) {
                const houres = value.split(":")[0];
                const minutes = value.split(":")[1];
                return {
                    ...prevEventObj,
                    [properyName]: setDateAndTime(prevEventObj[properyName], new Date().setHours(houres, minutes)),
                };
            }

            return {
                ...prevEventObj,
                [properyName]: value,
            };
        });
    };

    let footer = (
        <div style={{ height: "50px" }}>
            <p style={{ textAlign: "center" }}>Please pick the first day.</p>
        </div>
    );
    if (rangeDate?.from) {
        if (rangeDate?.to === rangeDate?.from) {
            footer = (
                <div style={{ height: "50px" }}>
                    <p style={{ textAlign: "center" }}>{format(rangeDate?.from, "PPP")}</p>
                </div>
            );
        } else if (rangeDate?.to) {
            footer = (
                <div style={{ height: "50px", marginLeft: "10%" }}>
                    <p>From: {format(rangeDate?.from, "PPP")}</p>
                    <p>To: {format(rangeDate?.to, "PPP")}</p>
                </div>
            );
        }
    }
    const handleCloseChangeMode = () => {
        setOpenCreatingNewEvent(false);
        setModifyEventId("");
    };

    const handleSaveChanges = () => {
        if (
            eventObj.startTime &&
            eventObj.endTime &&
            eventObj.startTime < eventObj.endTime &&
            eventObj.name &&
            eventObj.name.length > 4 &&
            eventObj.description &&
            eventObj.description.length > 10 &&
            eventObj.link &&
            validURL(eventObj.link) &&
            eventObj.maxParticipantsNumber > 0
        ) {
            onModify(eventObj, modifyEventId);
            setTime({ startTime: "", endTime: "" });
            handleCloseChangeMode();
        } else {
            toast.error(
                "There is a validation error, make sure you set all the values properly. Note: The Event Name needs to be more than 4 characters, The Event Description more than 10 characters, The end time can't be before start time ",
            );
        }
    };
    return (
        <ModifyEventItem>
            <DayPickerContainer>
                <DayPicker
                    mode="range"
                    defaultMonth={rangeDate?.from || new Date()}
                    selected={rangeDate}
                    onSelect={(selectedDateValue) => handleUpdateEventPropertyValue("rangeDate", selectedDateValue)}
                    footer={footer}
                    showOutsideDays
                    modifiersClassNames={{
                        selected: "selected-date",
                        today: "today-date",
                    }}
                    max={2}
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
                        <DisplayDate>
                            {rangeDate?.from ? format(rangeDate?.from, "yyyy-MM-dd") : "yyyy-MM-dd"}
                        </DisplayDate>
                        <TimeInputEditorContainer>
                            <InputEditor
                                inputType="time"
                                content={time?.startTime}
                                label="startTime"
                                onCopyChanges={handleUpdateEventPropertyValue}
                            />
                        </TimeInputEditorContainer>
                    </TimePickerContainer>
                    <TimePickerContainer>
                        <TimeInputLabel>To:</TimeInputLabel>
                        <DisplayDate>{rangeDate?.to ? format(rangeDate?.to, "yyyy-MM-dd") : "yyyy-MM-dd"}</DisplayDate>
                        <TimeInputEditorContainer>
                            <InputEditor
                                inputType="time"
                                content={time?.endTime}
                                label="endTime"
                                onCopyChanges={handleUpdateEventPropertyValue}
                            />
                        </TimeInputEditorContainer>
                    </TimePickerContainer>
                </TimePicking>
                <EventMaxParticipants>
                    <InputEditorIconContainer>
                        <MdOutlineEventSeat size="20px" />
                    </InputEditorIconContainer>
                    <InputEditor
                        inputType="number"
                        content={eventObj.maxParticipantsNumber}
                        label="maxParticipantsNumber"
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
