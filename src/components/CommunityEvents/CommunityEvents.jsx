import React, { useState } from "react";
import {
    ParentContainer,
    Container,
    Header,
    SubHeader,
    Tabs,
    NoDataComponent,
    EventList,
    EventNote,
    CommunityEventHeaderContainer,
} from "./CommunityEventsElement";
import eventsData from "./events.json";
import NoDataFound from "../../assets/images/no_data_found.svg";
import { EventItemList } from "./EventItemList";
import { RouterNavCreateButton } from "../Header/Navbar/NavbarElements";
import CreateCommunityEvent from "./CreateCommunityEvent";

const CommunityEvents = ({
    pageHeader,
    title,
    subtitle,
    modify,
    actionsIcon = [],
    eventsJoinedId = [],
    user,
    onActionChange = () => {},
}) => {
    const events = eventsData.events;
    const [isActiveTab, setActiveTab] = useState(0);
    const [openCreatingNewEvent, setOpenCreatingNewEvent] = useState(false);
    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
        today.getDate(),
    ).padStart(2, "0")}`;

    const tabNames = [
        { id: 0, status: "upcoming" },
        { id: 1, status: "past" },
        { id: 2, status: "cancelled" },
    ];

    const daysOfWeek = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

    const filteredEvents = events.filter((event) => event.status === tabNames[isActiveTab].status);
    return (
        <ParentContainer pageHeader={pageHeader}>
            <Container>
                <Header>{title}</Header>
                <SubHeader>{subtitle}</SubHeader>
                <CommunityEventHeaderContainer>
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
                    {modify && (
                        <RouterNavCreateButton noCenter onClick={() => setOpenCreatingNewEvent(true)}>
                            Create Event
                        </RouterNavCreateButton>
                    )}
                </CommunityEventHeaderContainer>

                <EventList>
                    {modify && openCreatingNewEvent && (
                        <CreateCommunityEvent setOpenCreatingNewEvent={setOpenCreatingNewEvent} />
                    )}
                    {filteredEvents.length !== 0 ? (
                        filteredEvents.map((data, index) => {
                            const dateObject = new Date(data.date);
                            const dayName = daysOfWeek[dateObject.getDay()];

                            return (
                                <EventItemList
                                    data={data}
                                    todayString={todayString}
                                    dayName={dayName}
                                    actions={actionsIcon}
                                    key={index}
                                    index={index}
                                    modify={modify}
                                    eventsJoinedId={eventsJoinedId}
                                    user={user}
                                    onActionChange={onActionChange}
                                />
                            );
                        })
                    ) : (
                        <NoDataComponent>
                            <h2>There is no {tabNames[isActiveTab].status} event right now.</h2>
                            <img src={NoDataFound} alt="No data found" />
                        </NoDataComponent>
                    )}
                </EventList>
                {!modify && !user && (
                    <EventNote>* To Join An Event You First Need To Login/Register To The Website</EventNote>
                )}
            </Container>
        </ParentContainer>
    );
};

export default CommunityEvents;
