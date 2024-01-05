import React, { useState } from "react";

import { EventItem } from "./EventItemListElement";
import {
    AiFillClockCircleIcon,
    MdLocationOnIcon,
    BiChevronDownIcon,
    BiSolidChevronUpIcon,
    AiFillExclamationCircleIcon,
} from "./CommunityEventsElement";

export const EventItemList = ({ data, todayString, dayName, actions, index, modify }) => {
    const [openEventIndex, setOpenEventIndex] = useState(null);

    return (
        <EventItem isRequestedEvent={data.reschedule} key={index}>
            <div className={data.date === todayString ? "date today-date" : "date"}>
                <p>{dayName}</p>
                <p className="date-digit">{data.date.split("-")[2]}</p>
            </div>
            <div className="time-line">
                <div className="time-line-detail">
                    <AiFillClockCircleIcon />
                    <p>
                        {data.startTime} - {data.endTime}
                    </p>
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
                    <p>{data.eventName}</p>
                    <div className="details-profile">
                        {data.participants.map((participant, pIndex) => (
                            <img src={participant.profileURL} alt={participant.name} key={pIndex} />
                        ))}
                    </div>
                </div>
                {data.reschedule && <div className="details-request">15:30 - 16:00 requested</div>}
            </div>
            {modify ? (
                <div className="action" onMouseLeave={() => setOpenEventIndex(null)}>
                    <div
                        onClick={() => setOpenEventIndex(openEventIndex === index ? null : index)}
                        className="action-edit"
                    >
                        <p>Edit</p>
                        {openEventIndex === index ? <BiSolidChevronUpIcon /> : <BiChevronDownIcon />}
                    </div>

                    {openEventIndex === index && (
                        <div className="action-dropdown">
                            {actions.map(({ icon: Icon, text }) => (
                                <div
                                    onClick={() => setOpenEventIndex(openEventIndex === index ? null : index)}
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
                data.status === "upcoming" && (
                    <div className="container-action">
                        <div className="action">
                            <div className="action-edit without-dropdown">
                                <p>Join</p>
                            </div>
                        </div>
                        <div className="details">
                            <p>
                                {data.participants.length} / {data.maxParticipantNumber}
                            </p>
                        </div>
                    </div>
                )
            )}
        </EventItem>
    );
};
