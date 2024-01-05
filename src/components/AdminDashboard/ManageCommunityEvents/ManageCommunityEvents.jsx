import React from "react";

import CommunityEvents from "../../CommunityEvents";
import {
    AiFillClockCircleIcon,
    AiOutlineCloseCircleIcon,
    BiUserPlusIcon,
    CommunityEventsContainer,
    GoProjectSymlinkIcon,
    MdLocationOnIcon,
} from "./ManageCommunityEventsElements";

const ManageCommunityEvents = () => {
    const actionsIcon = [
        { icon: AiFillClockCircleIcon, text: "Reschedule Event" },
        { icon: MdLocationOnIcon, text: "Edit location" },
        { icon: GoProjectSymlinkIcon, text: "Change Event Link" },
        { icon: BiUserPlusIcon, text: "Invite people" },
        { icon: AiOutlineCloseCircleIcon, text: "Cancel event" },
    ];
    return (
        <CommunityEventsContainer>
            <CommunityEvents
                title="Manage Community Events"
                subtitle="Here you can manage the community events"
                modify
                actionsIcon={actionsIcon}
            />
            ;
        </CommunityEventsContainer>
    );
};
export default ManageCommunityEvents;
