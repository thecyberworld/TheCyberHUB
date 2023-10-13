import React, { useState, useEffect } from "react";
import {
    ParentContainer,
    Container,
    Header,
    SubHeader,
    Tabs,
    BookingList,
    BookingItem,
    AiFillClockCircleIcon,
    MdLocationOnIcon,
    BiChevronDownIcon,
    BiSendIcon,
    BiUserPlusIcon,
    AiOutlineCloseCircleIcon,
    BiSolidChevronUpIcon,
    AiFillExclamationCircleIcon
} from "./TimeLineEventsElement";
import eventsData from '../../../events.json';

const TimeLineEvent = () => {
    const [isOpenBooking, setIsOpenBooking] = useState(false);
    const [isActiveTab, setActiveTab] = useState(0);
    const events = eventsData.events;

    const actions = [
        { icon: AiFillClockCircleIcon, text: 'Reschedule booking' },
        { icon: BiSendIcon, text: 'Request reschedule' },
        { icon: MdLocationOnIcon, text: 'Edit location' },
        { icon: BiUserPlusIcon, text: 'Invite people' },
        { icon: AiOutlineCloseCircleIcon, text: 'Cancel event' }
    ];

    const tabNames = [
        { id: 0, status: 'upcoming' },
        { id: 1, status: 'pending' },
        { id: 2, status: 'recurring' },
        { id: 3, status: 'past' },
        { id: 4, status: 'cancelled' }];

    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const filteredEvents = events.filter(event => event.status === tabNames[isActiveTab].status);

    console.log(filteredEvents, 'filteredEvents');

    return (
        <ParentContainer>
            <Container>
                <Header>Bookings</Header>
                <SubHeader>See your scheduled events from your calendar events links.</SubHeader>
                <Tabs>
                    {tabNames.map((tab, index) => (
                        <button
                            onClick={() => setActiveTab(index)}
                            key={tab.id}
                            className={isActiveTab === index ? 'active' : ''}
                        >
                            {tab.status}
                        </button>
                    ))}
                </Tabs>
                <BookingList>
                    {
                        events.map((data, index) => {
                            const dateObject = new Date(data.date);
                            const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
                            const dayName = daysOfWeek[dateObject.getDay()];
                            const [isRequestedEvent, setRequestedEvent] = useState(false);

                            useEffect(() => {
                                setRequestedEvent(data.reschedule);
                            }, [data.reschedule]);

                            return (<BookingItem isRequestedEvent={isRequestedEvent} key={index}>
                                <div className={data.date === todayString ? "date today-date" : "date"}>
                                    <p>{dayName}</p>
                                    <p className="date-digit">{data.date.split("-")[2]}</p>
                                </div>
                                <div className="time-line">
                                    <div className="time-line-detail">
                                        <AiFillClockCircleIcon />
                                        <p>{data.startTime} - {data.endTime}</p>
                                        {isRequestedEvent &&
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

                                    {isRequestedEvent &&
                                        <div className="details-request">
                                            15:30 - 16:00 requested
                                        </div>}
                                </div>
                                <div className="action">
                                    <div onClick={() => setIsOpenBooking(!isOpenBooking)} className="action-edit">
                                        <p>Edit</p>
                                        {isOpenBooking ? <BiSolidChevronUpIcon /> : <BiChevronDownIcon />}
                                    </div>

                                    {isOpenBooking && (
                                        <div className="action-dropdown">
                                            {actions.map(({ icon: Icon, text }) => (
                                                <div className="action-dropdown-list" onClick={() => setIsOpenBooking(!isOpenBooking)} key={text}>
                                                    <Icon />
                                                    <p>{text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </BookingItem>)
                        })}

                </BookingList>
            </Container>
        </ParentContainer>
    );
};


export default TimeLineEvent;
