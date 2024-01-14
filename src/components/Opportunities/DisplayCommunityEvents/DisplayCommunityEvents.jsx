import React from "react";
import { useDispatch, useSelector } from "react-redux";

import CommunityEvents from "../../CommunityEvents/CommunityEvents";
import { userAddEventId, userRemoveEventId } from "../../../features/userDetail/userDetailSlice";
import eventsData from "../../CommunityEvents/events.json";

const DisplayCommunityEvents = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { userEventsId } = useSelector((state) => state.userDetail);
    const events = eventsData.events;

    const handleActionChange = (actionDisplay, eventId) => {
        if (actionDisplay === "Join") {
            dispatch(userAddEventId(eventId));
        } else {
            dispatch(userRemoveEventId(eventId));
        }
    };
    return (
        <CommunityEvents
            pageHeader
            title="Community Events"
            subtitle="Join to any of the Community Events to develop your skill set."
            eventsJoinedId={userEventsId}
            user={user}
            onActionChange={handleActionChange}
            events={events}
        />
    );
};

export default DisplayCommunityEvents;
