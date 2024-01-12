import React from "react";

import CommunityEvents from "../../CommunityEvents";
import {
    AiOutlineCloseCircleIcon,
    BiUserPlusIcon,
    CommunityEventsContainer,
    TbEditCircleIcon,
} from "./ManageCommunityEventsElements";

const ManageCommunityEvents = () => {
    const actionsIcon = [
        { icon: TbEditCircleIcon, text: "Edit Details" },
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
        </CommunityEventsContainer>
    );
};
export default ManageCommunityEvents;
