import React, { useState } from "react";

import CommunityEvents from "../../CommunityEvents";
import {
    AiOutlineCloseCircleIcon,
    BiUserPlusIcon,
    CommunityEventsContainer,
    TbEditCircleIcon,
    TbRestoreIcon,
} from "./ManageCommunityEventsElements";
import eventsData from "../../CommunityEvents/events.json";

const changeEventStatus = (events, newStatus, eventId) => {
    const modifyEventIndex = events.findIndex((event) => event._id === eventId);
    events[modifyEventIndex].status = newStatus;
    return [...events];
};
const ManageCommunityEvents = () => {
    const [events, setEvents] = useState(eventsData.events);
    const [modifyEventId, setModifyEventId] = useState("");
    const actions = {
        upcoming: [
            {
                icon: TbEditCircleIcon,
                text: "Edit Details",
                onClick: (eventId) => setModifyEventId(eventId),
            },
            {
                icon: BiUserPlusIcon,
                text: "Invite people",
                onClick: (eventId) => {},
            },
            {
                icon: AiOutlineCloseCircleIcon,
                text: "Cancel event",
                onClick: (eventId) => {
                    setEvents((prevEvents) => {
                        return changeEventStatus(prevEvents, "cancelled", eventId);
                    });
                },
            },
        ],
        cancelled: [
            {
                icon: TbRestoreIcon,
                text: "Restore event",
                onClick: (eventId) => {
                    setEvents((prevEvents) => {
                        return changeEventStatus(prevEvents, "approved", eventId);
                    });
                },
            },
        ],
        past: [
            {
                icon: TbEditCircleIcon,
                text: "Edit Details",
                onClick: (eventId) => setModifyEventId(eventId),
            },
        ],
    };

    return (
        <CommunityEventsContainer>
            <CommunityEvents
                title="Manage Community Events"
                subtitle="Here you can manage the community events"
                modify
                actions={actions}
                events={events}
                modifyEventId={modifyEventId}
                setModifyEventId={setModifyEventId}
            />
        </CommunityEventsContainer>
    );
};
export default ManageCommunityEvents;
