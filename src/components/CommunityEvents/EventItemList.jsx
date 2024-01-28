import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "react-toastify";

import { EventItem } from "./EventItemListElement";
import {
    AiFillClockCircleIcon,
    MdLocationOnIcon,
    BiChevronDownIcon,
    BiSolidChevronUpIcon,
    AiFillExclamationCircleIcon,
} from "./CommunityEventsElement";

const AddZeroToDateString = (dateValue) => {
    return +dateValue < 10 ? `0${dateValue}` : dateValue;
};
export const EventItemList = ({
    data,
    todayString,
    dayName,
    actions,
    index,
    modify,
    eventsJoinedId,
    user,
    onActionChange,
    tabStatus,
}) => {
    const [openEventIndex, setOpenEventIndex] = useState(null);
    const [actionDisplay, setActionDisplay] = useState("");
    const [leftPlacesToJoin, setLeftPlacesToJoin] = useState(100);

    useEffect(() => {
        if (!user) return setActionDisplay("Join*");
        if (eventsJoinedId.includes(data._id)) {
            setActionDisplay("Joined");
        } else {
            setActionDisplay("Join");
        }
        setLeftPlacesToJoin(data.maxParticipantsNumber - data.participants.length);
    }, [eventsJoinedId, data, user]);

    const handleDisplayActionClick = () => {
        if (!user) toast.info("To Join An Event You First Need To Login/Register To The Website");
        if (leftPlacesToJoin === 0 && !eventsJoinedId.includes(data._id)) return;
        if (actionDisplay === "Join") {
            data.participants.push(user._id);
        } else {
            data.participants = data.participants.filter((userId) => userId !== user._id);
        }
        onActionChange(actionDisplay, data._id);
    };
    const startTimeDate = new Date(data.startTime);
    const endTimeDate = new Date(data.endTime);
    return (
        <EventItem isRequestedEvent={data.reschedule} key={index}>
            <div
                className={
                    data.startTime.split("T")[0] === todayString && data.status === "approved" && tabStatus !== "past"
                        ? "date today-date"
                        : "date"
                }
            >
                <p>{dayName}</p>
                <p className="date-digit">
                    {`${startTimeDate.toLocaleString("default", {
                        month: "short",
                    })} ${AddZeroToDateString(startTimeDate.getDate())}`}
                </p>
                <p className="date-digit date-year">{`${data.startTime.split("-")[0]}`}</p>
            </div>
            <div className="time-line">
                <div className="time-line-detail">
                    <AiFillClockCircleIcon />
                    {data.startTime.split("T")[0] === data.endTime.split("T")[0] ? (
                        <p>
                            {`${AddZeroToDateString(startTimeDate.getHours())}:${AddZeroToDateString(
                                startTimeDate.getMinutes(),
                            )}`}
                            {" - "}
                            {`${AddZeroToDateString(endTimeDate.getHours())}:${AddZeroToDateString(
                                endTimeDate.getMinutes(),
                            )}`}
                        </p>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <div>
                                <p title="yyyy-MM-dd" style={{ textAlign: "center", fontSize: 11 }}>
                                    {format(startTimeDate, "yyyy-MM-dd").replace(/-/g, "/")}
                                </p>
                                <p style={{ textAlign: "center" }}>{`${AddZeroToDateString(
                                    startTimeDate.getHours(),
                                )}:${AddZeroToDateString(startTimeDate.getMinutes())}`}</p>
                            </div>
                            -
                            <div>
                                <p title="yyyy-MM-dd" style={{ textAlign: "center", fontSize: 11 }}>
                                    {format(endTimeDate, "yyyy-MM-dd").replace(/-/g, "/")}
                                </p>
                                <p style={{ textAlign: "center" }}>{`${AddZeroToDateString(
                                    endTimeDate.getHours(),
                                )}:${AddZeroToDateString(endTimeDate.getMinutes())}`}</p>
                            </div>
                        </div>
                    )}
                    {data.reschedule && (
                        <div className="time-line-request">
                            <AiFillExclamationCircleIcon />
                        </div>
                    )}
                </div>

                <div className="time-line-detail">
                    <MdLocationOnIcon />
                    <p className="text-over-flow">{data.location}</p>
                </div>
            </div>
            <div className="details">
                <div>
                    <p>{data.name.toUpperCase()}</p>
                    <div className="details-profile">
                        {data.participants.map((participant, pIndex) => (
                            <img src={participant.profileURL} alt={participant.name} key={pIndex} />
                        ))}
                    </div>
                </div>
                {data.reschedule && <div className="details-request">15:30 - 16:00 requested</div>}
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
                                        onClick(data);
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
                tabStatus === "upcoming" && (
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
                        <div className="details">
                            <p>
                                {data.participants.length} / {data.maxParticipantsNumber}
                            </p>
                        </div>
                    </div>
                )
            )}
        </EventItem>
    );
};
