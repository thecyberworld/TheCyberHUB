import React from "react";
import { useLocation } from "react-router";

const DisplayCommunityEventDetails = () => {
    const {
        state: { actionDisplay, event },
    } = useLocation();
    console.log(actionDisplay, event);
    return <></>;
};
export default DisplayCommunityEventDetails;
