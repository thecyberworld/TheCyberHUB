import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { GoProjectSymlink } from "react-icons/go";

import {
    EventDetails,
    EventDetailsDateContainer,
    EventDetailsDescription,
    EventDetailsHeader,
    EventDetailsHeaderContainer,
    EventDetailsHeaderText,
    EventDetailsTitle,
    EventLink,
} from "./DisplayEventDetailsElement";
import DateDisplay from "../../Common/DateDisplay";
import ParticipantsDisplay from "../../CommunityEvents/ParticipantsDisplay";
import DisplayTimelineList from "./DisplayTimelineList";

const DisplayEventDetails = () => {
    const [currentEvent, setCurrentEvent] = useState({});
    const { actionDisplay, event } = useLocation().state || {};
    useEffect(() => {
        if (event) setCurrentEvent(event);
    }, [event]);
    if (!currentEvent) return <></>;
    return (
        <EventDetails>
            <EventDetailsHeaderContainer>
                <EventDetailsHeader>
                    <EventDetailsHeaderText>
                        <EventDetailsTitle>{currentEvent.name}</EventDetailsTitle>
                        <EventDetailsDescription>{currentEvent.description}</EventDetailsDescription>
                    </EventDetailsHeaderText>
                    <EventDetailsDateContainer>
                        <DateDisplay time={currentEvent.startTime} />
                    </EventDetailsDateContainer>
                </EventDetailsHeader>
                {actionDisplay === "Joined" && (
                    <EventLink
                        href={
                            /(https):\/\//i.test(currentEvent.link) ? currentEvent.link : `https://${currentEvent.link}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <GoProjectSymlink size="24px" style={{ marginRight: "10px" }} />
                        {currentEvent.link}
                    </EventLink>
                )}
            </EventDetailsHeaderContainer>
            <DisplayTimelineList>{currentEvent.timeline}</DisplayTimelineList>
            <ParticipantsDisplay participants={currentEvent.participants} />
        </EventDetails>
    );
};
export default DisplayEventDetails;
