import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

import {
    EventDetails,
    EventDetailsDateContainer,
    EventDetailsDescription,
    EventDetailsHeader,
    EventDetailsHeaderText,
    EventDetailsTitle,
    EventLink,
} from "./DisplayCommunityEventDetailsElement";
import DateDisplay from "src/components/Common/DateDisplay";
import ParticipantsDisplay from "src/components/CommunityEvents/ParticipantsDisplay";
import { GoProjectSymlink } from "react-icons/go";

const DisplayCommunityEventDetails = () => {
    const [currentEvent, setCurrentEvent] = useState({});
    const { actionDisplay, event } = useLocation().state || {};
    useEffect(() => {
        if (event) setCurrentEvent(event);
    }, [event]);
    if (!currentEvent) return <></>;
    return (
        <EventDetails>
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
                    href={/(https):\/\//i.test(currentEvent.link) ? currentEvent.link : `https://${currentEvent.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <GoProjectSymlink size="24px" style={{ marginRight: "10px" }} />
                    {currentEvent.link}
                </EventLink>
            )}
            <ParticipantsDisplay participants={currentEvent.participants} />
        </EventDetails>
    );
};
export default DisplayCommunityEventDetails;
