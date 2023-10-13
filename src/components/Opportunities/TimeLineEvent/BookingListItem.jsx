import React from "react";
import { BookingItem } from "./BookingListItemsElement";

import {
    AiFillClockCircleIcon,
    MdLocationOnIcon,
    BiChevronDownIcon,
    BiSolidChevronUpIcon,
    AiFillExclamationCircleIcon,
} from "./TimeLineEventsElement";

export const BookingItemList = (
    { data, todayString, dayName, actions, openBookingIndex, setOpenBookingIndex, index }
) => {

    return (
        <BookingItem isRequestedEvent={data.reschedule} key={index}>
            <div className={data.date === todayString ? "date today-date" : "date"}>
                <p>{dayName}</p>
                <p className="date-digit">
                    {data.date.split("-")[2]}
                </p>
            </div>
            <div className="time-line">
                <div className="time-line-detail">
                    <AiFillClockCircleIcon />
                    <p>{data.startTime} - {data.endTime}</p>
                    {data.reschedule &&
                        <div className="time-line-request">
                            <AiFillExclamationCircleIcon />
                        </div>
                    }
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
                {data.reschedule &&
                    <div className="details-request">
                        15:30 - 16:00 requested
                    </div>}
            </div>
            <div className="action">
                <div onClick={() => setOpenBookingIndex(openBookingIndex === index ? null : index)}
                    className="action-edit">
                    <p>Edit</p>
                    {openBookingIndex === index ? <BiSolidChevronUpIcon /> : <BiChevronDownIcon />}
                </div>

                {openBookingIndex === index && (
                    <div className="action-dropdown">
                        {actions.map(({ icon: Icon, text }) => (
                            <div onClick={() => setOpenBookingIndex(openBookingIndex === index ? null : index)}
                                className="action-dropdown-list" key={text}>
                                <Icon />
                                <p>{text}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </BookingItem>
    );
};
