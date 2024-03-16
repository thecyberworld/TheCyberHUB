import React from "react";
import { useParams } from "react-router";
import CTFDataOld from "src/components/CaptureTheFlag/CTFDataOld";
import { encodeURL } from "src/components/Blogs/util";
import {
    EventComponent,
    EventContent,
    EventDate,
    EventHeaderImage,
    EventHeaderImageContainer,
    EventTitle,
    // EventVenue,
} from "src/components/OldEvents/EventsElement";

const Event = () => {
    const { title } = useParams();
    const event = [...CTFDataOld].find((event) => encodeURL(event?.title) === title);

    return (
        <EventComponent>
            <EventHeaderImageContainer>
                <EventHeaderImage src={event?.image} alt={event?.title} />
                {/* <EventVenue>{event?.venue}</EventVenue> */}
            </EventHeaderImageContainer>
            <EventTitle>{event?.title}</EventTitle>
            <EventDate>{event?.date}</EventDate>
            <EventContent>{event?.content}</EventContent>
        </EventComponent>
    );
};

export default Event;
