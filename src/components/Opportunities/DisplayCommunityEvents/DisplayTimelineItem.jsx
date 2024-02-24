import React from "react";

import {
    DisplayTimelineItemContainer,
    DisplayTimelineItemContextContainer,
    DisplayTimelineItemDescription,
    DisplayTimelineItemHeader,
    DisplayTimelineItemOtherInfoContainer,
    DisplayTimelineItemProgramContainer,
    DisplayTimelineItemTitle,
    DisplayTimelineItemTopic,
} from "./DisplayTimelineElements";
import UserInfo from "../../Dashboard/Profile/UserLinks/UserInfo";
import DurationDisplay from "../../Common/DurationDisplay/DurationDisplay";

const DisplayTimelineItem = ({ children }) => {
    const programInfo = {
        name: children.program,
    };
    return (
        <DisplayTimelineItemContainer>
            <DisplayTimelineItemProgramContainer>
                {/* User - activity/speaker */}
                <UserInfo
                    heightSize="120px"
                    widthSize="120px"
                    fontSizeName="1rem"
                    fontSizeUsername="0.8rem"
                    avatarPath=""
                >
                    {programInfo}
                </UserInfo>
            </DisplayTimelineItemProgramContainer>
            <DisplayTimelineItemOtherInfoContainer>
                <DisplayTimelineItemHeader>
                    <DisplayTimelineItemContextContainer>
                        <DisplayTimelineItemTitle>{children.title}</DisplayTimelineItemTitle>
                        <DisplayTimelineItemTopic>{children.topic}</DisplayTimelineItemTopic>
                    </DisplayTimelineItemContextContainer>
                    <DurationDisplay showDate>{children}</DurationDisplay>
                </DisplayTimelineItemHeader>
                <DisplayTimelineItemDescription>{children.description}</DisplayTimelineItemDescription>
            </DisplayTimelineItemOtherInfoContainer>
        </DisplayTimelineItemContainer>
    );
};
export default DisplayTimelineItem;
