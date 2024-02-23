import React from "react";

import {
    DisplayTimelineItemContainer,
    DisplayTimelineItemOtherInfoContainer,
    DisplayTimelineItemProgramContainer,
} from "./DisplayTimelineElements";
import UserInfo from "../../Dashboard/Profile/UserLinks/UserInfo";

const DisplayTimelineItem = ({ children }) => {
    return (
        <DisplayTimelineItemContainer>
            <DisplayTimelineItemProgramContainer>
                {/* User - activity/speaker */}
                <UserInfo
                    heightSize="100px"
                    widthSize="100px"
                    fontSizeName="1rem"
                    fontSizeUsername="0.8rem"
                    avatarPath=""
                >
                    {{ name: "name2" }}
                </UserInfo>
            </DisplayTimelineItemProgramContainer>
            <DisplayTimelineItemOtherInfoContainer></DisplayTimelineItemOtherInfoContainer>
        </DisplayTimelineItemContainer>
    );
};
export default DisplayTimelineItem;
