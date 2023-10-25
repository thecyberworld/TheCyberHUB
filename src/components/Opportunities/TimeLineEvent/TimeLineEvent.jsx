import React, { useState } from "react";
import {
    ParentContainer,
    Container,
    Header,
    SubHeader,
    Tabs,
    AiFillClockCircleIcon,
    MdLocationOnIcon,
    BiSendIcon,
    BiUserPlusIcon,
    AiOutlineCloseCircleIcon,
    NoDataComponent,
} from "./TimeLineEventsElement";
import eventsData from "./events.json";
import NoDataFound from "../../../assets/images/no_data_found.svg";
import { BookingItemList } from "./BookingListItem";

const TimeLineEvent = () => {
    const events = eventsData.events;
    const [openBookingIndex, setOpenBookingIndex] = useState(null);
    const [isActiveTab, setActiveTab] = useState(0);
    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
        today.getDate(),
    ).padStart(2, "0")}`;

    const tabNames = [
        { id: 0, status: "upcoming" },
        { id: 1, status: "pending" },
        { id: 2, status: "recurring" },
        { id: 3, status: "past" },
        { id: 4, status: "cancelled" },
    ];

    const daysOfWeek = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

    const actionsIcon = [
        { icon: AiFillClockCircleIcon, text: "Reschedule booking" },
        { icon: BiSendIcon, text: "Request reschedule" },
        { icon: MdLocationOnIcon, text: "Edit location" },
        { icon: BiUserPlusIcon, text: "Invite people" },
        { icon: AiOutlineCloseCircleIcon, text: "Cancel event" },
    ];

    const filteredEvents = events.filter((event) => event.status === tabNames[isActiveTab].status);

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
                            className={isActiveTab === index ? "active" : ""}
                        >
                            {tab.status}
                        </button>
                    ))}
                </Tabs>
                <div className="booking-list">
                    {filteredEvents.length !== 0 ? (
                        filteredEvents.map((data, index) => {
                            const dateObject = new Date(data.date);
                            const dayName = daysOfWeek[dateObject.getDay()];

                            return (
                                <BookingItemList
                                    data={data}
                                    todayString={todayString}
                                    dayName={dayName}
                                    actions={actionsIcon}
                                    openBookingIndex={openBookingIndex}
                                    setOpenBookingIndex={setOpenBookingIndex}
                                    key={index}
                                    index={index}
                                />
                            );
                        })
                    ) : (
                        <NoDataComponent>
                            <h2>There is no {tabNames[isActiveTab].status} event right now.</h2>
                            <img src={NoDataFound} alt="Np data found" />
                        </NoDataComponent>
                    )}
                </div>
            </Container>
        </ParentContainer>
    );
};

export default TimeLineEvent;
