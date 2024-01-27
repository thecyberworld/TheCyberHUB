import React, { useState } from "react";
import { useDispatch } from "react-redux";

import CommunityEvents from "../../CommunityEvents";
import {
    AiOutlineCloseCircleIcon,
    BiUserPlusIcon,
    CommunityEventsContainer,
    TbEditCircleIcon,
    TbRestoreIcon,
} from "./ManageCommunityEventsElements";
import { updateEvent } from "../../../features/events/eventsSlice";

const ManageCommunityEvents = () => {
    const dispatch = useDispatch();
    const [modifyEventId, setModifyEventId] = useState("");
    const actions = {
        upcoming: [
            {
                icon: TbEditCircleIcon,
                text: "Edit Details",
                onClick: (modifiedEvent) => setModifyEventId(modifiedEvent._id),
            },
            {
                icon: BiUserPlusIcon,
                text: "Invite people",
                onClick: (modifiedEvent) => {},
            },
            {
                icon: AiOutlineCloseCircleIcon,
                text: "Cancel event",
                onClick: (modifiedEvent) =>
                    dispatch(
                        updateEvent({ id: modifiedEvent._id, eventData: { ...modifiedEvent, status: "cancelled" } }),
                    ),
            },
        ],
        cancelled: [
            {
                icon: TbRestoreIcon,
                text: "Restore event",
                onClick: (modifiedEvent) => {
                    console.log(modifiedEvent);
                    dispatch(
                        updateEvent({ id: modifiedEvent._id, eventData: { ...modifiedEvent, status: "approved" } }),
                    );
                },
            },
        ],
        past: [
            {
                icon: TbEditCircleIcon,
                text: "Edit Details",
                onClick: (modifiedEvent) => setModifyEventId(modifiedEvent._id),
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
                modifyEventId={modifyEventId}
                setModifyEventId={setModifyEventId}
            />
        </CommunityEventsContainer>
    );
};
export default ManageCommunityEvents;
