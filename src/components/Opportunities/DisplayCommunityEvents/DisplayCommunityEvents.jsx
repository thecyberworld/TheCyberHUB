import React from "react";
import { useSelector } from "react-redux";

import CommunityEvents from "../../CommunityEvents/CommunityEvents";
// import { userAddEventId, userRemoveEventId } from "../../../features/userDetail/userDetailSlice";

const DisplayCommunityEvents = () => {
    // const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { userEventsId } = useSelector((state) => state.userDetail);

    const handleActionChange = (actionDisplay, eventId) => {
        if (actionDisplay === "Join") {
            console.log(actionDisplay, eventId);
            // dispatch(userAddEventId(eventId));
        } else {
            console.log(actionDisplay, eventId);
            // dispatch(userRemoveEventId(eventId));
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
        />
    );
};

export default DisplayCommunityEvents;
