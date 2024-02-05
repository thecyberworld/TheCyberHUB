import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { MdOpenInNew } from "react-icons/md";
import { useNavigate } from "react-router";

import { EventItem } from "./EventItemListElement";
import {
    AiFillClockCircleIcon,
    MdLocationOnIcon,
    BiChevronDownIcon,
    BiSolidChevronUpIcon,
    AiFillExclamationCircleIcon,
} from "./CommunityEventsElement";
import DateDisplay from "../Common/DateDisplay";
import ParticipantsDisplay from "./ParticipantsDisplay";

const addZeroToDateString = (dateValue) => {
    return +dateValue < 10 ? `0${dateValue}` : dateValue;
};
export const EventItemList = ({ event, actions, index, modify, eventsJoinedId, user, onActionChange, tabStatus }) => {
    const [openEventIndex, setOpenEventIndex] = useState(null);
    const [actionDisplay, setActionDisplay] = useState("");
    const [leftPlacesToJoin, setLeftPlacesToJoin] = useState(100);
    const nativage = useNavigate();
    useEffect(() => {
        if (!user) {
            setActionDisplay("Join*");
            setLeftPlacesToJoin(100);
            return;
        }
        if (eventsJoinedId.includes(event._id)) {
            setActionDisplay("Joined");
        } else {
            setActionDisplay("Join");
        }
        setLeftPlacesToJoin(event.maxParticipantsNumber - event.participants.length);
    }, [eventsJoinedId, event, user]);

    const handleDisplayActionClick = () => {
        if (!user) return toast.info("To Join An Event You First Need To Login/Register To The Website");
        if (leftPlacesToJoin === 0 && !eventsJoinedId.includes(event._id))
            return toast.info("This event is full , keep in touch for future events");
        onActionChange(actionDisplay, event._id);
    };
    const startTimeDate = new Date(event.startTime);
    const endTimeDate = new Date(event.endTime);

    return (
        <EventItem isRequestedEvent={event.reschedule} key={index}>
            <DateDisplay
                rightBorder
                time={event.startTime}
                isCanBeToday={event.status === "approved" && tabStatus !== "past"}
            />
            <div className="time-line">
                <div className="time-line-detail">
                    <AiFillClockCircleIcon />
                    {event.startTime.split("T")[0] === event.endTime.split("T")[0] ? (
                        <p>
                            {`${addZeroToDateString(startTimeDate.getHours())}:${addZeroToDateString(
                                startTimeDate.getMinutes(),
                            )}`}
                            {" - "}
                            {`${addZeroToDateString(endTimeDate.getHours())}:${addZeroToDateString(
                                endTimeDate.getMinutes(),
                            )}`}
                        </p>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <div>
                                <p title="yyyy-MM-dd" style={{ textAlign: "center", fontSize: 11 }}>
                                    {format(startTimeDate, "yyyy-MM-dd").replace(/-/g, "/")}
                                </p>
                                <p style={{ textAlign: "center" }}>{`${addZeroToDateString(
                                    startTimeDate.getHours(),
                                )}:${addZeroToDateString(startTimeDate.getMinutes())}`}</p>
                            </div>
                            -
                            <div>
                                <p title="yyyy-MM-dd" style={{ textAlign: "center", fontSize: 11 }}>
                                    {format(endTimeDate, "yyyy-MM-dd").replace(/-/g, "/")}
                                </p>
                                <p style={{ textAlign: "center" }}>{`${addZeroToDateString(
                                    endTimeDate.getHours(),
                                )}:${addZeroToDateString(endTimeDate.getMinutes())}`}</p>
                            </div>
                        </div>
                    )}
                    {event.reschedule && (
                        <div className="time-line-request">
                            <AiFillExclamationCircleIcon />
                        </div>
                    )}
                </div>

                <div className="time-line-detail">
                    <MdLocationOnIcon />
                    <p className="text-over-flow">{event.location}</p>
                </div>
            </div>
            <div className="details">
                <div style={{ maxWidth: "90%" }}>
                    <p style={{ overflowWrap: "break-word" }}>{event.name.toUpperCase()}</p>
                    <ParticipantsDisplay participants={event.participants} />
                </div>
                {event.reschedule && <div className="details-request">15:30 - 16:00 requested</div>}
            </div>
            {modify && actions[tabStatus] && actions[tabStatus].length > 0 ? (
                <div className="action" onMouseLeave={() => setOpenEventIndex(null)}>
                    <div
                        onClick={() => setOpenEventIndex(openEventIndex === index ? null : index)}
                        className="action-edit"
                    >
                        <p>Options</p>
                        {openEventIndex === index ? <BiSolidChevronUpIcon /> : <BiChevronDownIcon />}
                    </div>

                    {openEventIndex === index && (
                        <div className="action-dropdown">
                            {actions[tabStatus].map(({ icon: Icon, text, onClick }) => (
                                <div
                                    onClick={() => {
                                        onClick(event);
                                        setOpenEventIndex(openEventIndex === index ? null : index);
                                    }}
                                    className="action-dropdown-list"
                                    key={text}
                                >
                                    <Icon />
                                    <p>{text}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                (tabStatus === "upcoming" || tabStatus === "ongoing") && (
                    <>
                        <div className="container-action">
                            <div className="action">
                                <div
                                    className={`action-edit without-dropdown ${
                                        leftPlacesToJoin === 0
                                            ? " uniqe-state-button"
                                            : actionDisplay === "Join"
                                            ? " enable-button"
                                            : " disable-button"
                                    }`}
                                    onClick={handleDisplayActionClick}
                                >
                                    <p>{leftPlacesToJoin === 0 ? "Full" : actionDisplay}</p>
                                </div>
                            </div>
                        </div>
                        <div className="more-details">
                            <MdOpenInNew
                                size={16}
                                title="More Details"
                                onClick={() =>
                                    nativage(`/community-events/${event._id.slice(0, 10)}`, {
                                        state: { actionDisplay, event },
                                    })
                                }
                            />
                        </div>
                    </>
                )
            )}
        </EventItem>
    );
};
