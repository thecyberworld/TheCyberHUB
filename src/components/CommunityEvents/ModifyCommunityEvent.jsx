import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { GoProjectSymlink } from "react-icons/go";
import { MdOutlineEventSeat } from "react-icons/md";
import { toast } from "react-toastify";

import InputEditor from "src/components/Common/InputEditor";
import { AiFillClockCircleIcon } from "./CommunityEventsElement";
import {
    ModifyActionsContainer,
    ModifyActionButton,
    ModifyActionText,
    DayPickerContainer,
    Link,
    LinkEditor,
    MaxParticipants,
    InputEditorIconContainer,
    TimePicking,
    ModifyItem,
    DetailsInputEventContainer,
} from "./ModifyElements";
import TimePickerDisplay from "src/components/Common/TimePickerDisplay";
import "react-day-picker/dist/style.css";
import { setDateAndTime } from "src/utils/dateTimeRelatedFunctions";

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

const ModifyCommunityEvent = ({ onCloseChangeMode, onModify, modifyEvent, modifyEventId }) => {
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
        }
    }, []);
    const handleUpdateEventPropertyValue = (properyName, value) => {
        setEventObj((prevEventObj) => {
            // related only to the DayPicker
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

            return {
                ...prevEventObj,
                [properyName]: value,
            };
        });
    };
    // related only to the DayPicker
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
            // setTime({ startTime: "", endTime: "" });
            onCloseChangeMode();
        } else {
            toast.error(
                "There is a validation error, make sure you set all the values properly. Note: The Event Name needs to be more than 4 characters, The Event Description more than 10 characters, The end time can't be before start time ",
            );
        }
    };
    return (
        <ModifyItem>
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
            <DetailsInputEventContainer>
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
                    <TimePickerDisplay
                        rangeDate={rangeDate}
                        dateFieldType="show date"
                        modifyObj={modifyEvent}
                        setModifyObj={setEventObj}
                    >
                        From:
                    </TimePickerDisplay>
                    <TimePickerDisplay
                        rangeDate={rangeDate}
                        dateFieldType="show date"
                        modifyObj={modifyEvent}
                        setModifyObj={setEventObj}
                    >
                        To:
                    </TimePickerDisplay>
                </TimePicking>
                <MaxParticipants>
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
                </MaxParticipants>

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
                <Link>
                    <InputEditorIconContainer>
                        <GoProjectSymlink size="20px" />
                    </InputEditorIconContainer>
                    <LinkEditor>
                        <InputEditor
                            inputType="url"
                            content={eventObj.link}
                            label="link"
                            placeholder="https://www.eventlink.com"
                            onCopyChanges={handleUpdateEventPropertyValue}
                        />
                    </LinkEditor>
                </Link>
            </DetailsInputEventContainer>

            <ModifyActionsContainer>
                <ModifyActionButton type="save" onClick={handleSaveChanges}>
                    <ModifyActionText type="save">Save</ModifyActionText>
                </ModifyActionButton>
                <ModifyActionButton type="cancel" onClick={onCloseChangeMode}>
                    <ModifyActionText type="cancel">Cancel</ModifyActionText>
                </ModifyActionButton>
            </ModifyActionsContainer>
        </ModifyItem>
    );
};
export default ModifyCommunityEvent;
