import React from "react";
import EventsData from "./EventsData/EventsData";
import CTFData from "../../CyberGames/CTF/CTFData";
import {
    EventsContainer,
    TodayEventContainer,
    EventsHeading,
    OnGoingEventsContainer,
    UpComingEventsContainer,
    PastEventsContainer,
    RouterLink,
    EventsHeader,
    EventsImage,
    EventLink,
    EventsHeadingMedium,
    EventsSubHeading,
    EventLocation,
    EventsVenue,
    UpComingEventsCardContainer,
    EventsHeadingSmall,
    PastEventsCardContainer,
    OnGoingEventsCardContainer,
    UpPastEventContainer,
    UpComingEvents,
} from "./EventsElement";
import { encodeURL } from "../../Learn/Blogs/util";

function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
}

function formatDate(date) {
    return [padTo2Digits(date.getMonth() + 1), date.getFullYear(), padTo2Digits(date.getDate())].join("/");
}

const Events = () => {
    const allEvents = [...EventsData, ...CTFData].sort(
        (a, b) => new Date(a.validationDate) - new Date(b.validationDate),
    );
    const pastEvents = allEvents.filter((event) => new Date(event.validationDate) < new Date()).reverse();
    const tenPastEvents = pastEvents.slice(0, 8);
    const todayDate = new Date(Date());

    return (
        <EventsContainer>
            <TodayEventContainer>
                {allEvents.some((event) => formatDate(todayDate) === formatDate(new Date(event.validationDate))) ? (
                    <>
                        <EventsHeading>Today Events</EventsHeading>
                        <OnGoingEventsContainer>
                            {allEvents.map((event, id) =>
                                formatDate(todayDate) === formatDate(new Date(event.validationDate)) ? (
                                    <RouterLink key={id} to={{ pathname: `${encodeURL(event.title)}` }}>
                                        <OnGoingEventsCardContainer>
                                            <EventsHeader>
                                                <EventsImage
                                                    src={event.image}
                                                    about="Event Image"
                                                    width="100%"
                                                    height="180px"
                                                />
                                                <EventsHeadingSmall> {event.title} </EventsHeadingSmall>
                                                <EventsSubHeading>
                                                    <EventLocation> {event.location} </EventLocation>
                                                    {event.date} • <EventsVenue> {event.venue} </EventsVenue>
                                                </EventsSubHeading>
                                            </EventsHeader>
                                        </OnGoingEventsCardContainer>
                                    </RouterLink>
                                ) : null,
                            )}
                        </OnGoingEventsContainer>
                    </>
                ) : (
                    <>Next Event is on {allEvents[0].validationDate}</>
                )}
            </TodayEventContainer>

            <UpPastEventContainer>
                <UpComingEvents>
                    {allEvents.some((event) => formatDate(todayDate) < formatDate(new Date(event.validationDate))) ? (
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <EventsHeading>Up Coming Events</EventsHeading>
                            <UpComingEventsContainer>
                                {allEvents.map((event, id) =>
                                    formatDate(todayDate) < formatDate(new Date(event.validationDate)) ? (
                                        <RouterLink key={id} to={{ pathname: `${encodeURL(event.title)}` }}>
                                            <UpComingEventsCardContainer>
                                                <EventsHeader>
                                                    <EventsImage
                                                        src={event.image}
                                                        about="Event Image"
                                                        width="100%"
                                                        height="180px"
                                                    />
                                                    <EventLink href={event.url} target={"_blank"}>
                                                        <EventsHeadingMedium> {event.title} </EventsHeadingMedium>
                                                    </EventLink>
                                                    <EventsSubHeading>
                                                        <EventLocation> {event.location} </EventLocation>
                                                        {event.date} • <EventsVenue> {event.venue} </EventsVenue>
                                                    </EventsSubHeading>
                                                </EventsHeader>
                                            </UpComingEventsCardContainer>
                                        </RouterLink>
                                    ) : null,
                                )}
                            </UpComingEventsContainer>
                        </div>
                    ) : (
                        <>
                            <EventsHeading>No Up Coming Events</EventsHeading>
                        </>
                    )}
                </UpComingEvents>

                <PastEventsContainer>
                    <EventsHeading>Past Events</EventsHeading>
                    {tenPastEvents.map(
                        (event, id) =>
                            formatDate(todayDate) > formatDate(new Date(event.validationDate)) ? (
                                <RouterLink key={id} to={{ pathname: `${encodeURL(event.title)}` }}>
                                    <PastEventsCardContainer>
                                        <EventsHeader>
                                            <EventsImage
                                                src={event.image}
                                                about="Event Image"
                                                width="100%"
                                                height="180px"
                                            />
                                            <EventsHeadingSmall> {event.title} </EventsHeadingSmall>
                                            <EventsSubHeading>
                                                <EventLocation> {event.location} </EventLocation>
                                                {event.date} • <EventsVenue> {event.venue} </EventsVenue>
                                            </EventsSubHeading>
                                        </EventsHeader>
                                    </PastEventsCardContainer>
                                </RouterLink>
                            ) : null,
                        // (<>
                        //     <EventsHeading>No Past Events</EventsHeading>
                        // </>)
                    )}
                </PastEventsContainer>
            </UpPastEventContainer>
        </EventsContainer>
    );
};

export default Events;
