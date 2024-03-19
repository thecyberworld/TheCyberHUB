import React from "react";
import {
    Caption,
    Title,
    CTABtn,
    InnerCard,
    LastThirtyDaysBtn,
    BottomSection,
    BottomLeftSection,
    BottomLeftSectionCaption,
    BottomSectionCaptionTitle,
    LastUpdated,
    TimeCaptionBtnHours,
    TimeCaptionBtnDays,
    BottomRightSection,
    BottomRightSectionInnerCard,
    PopularPostCard,
    PostDetails,
    PostTitleDate,
    PostIcons,
    PostTitle,
    PostDate,
    LikesIcon,
    CommentsIcon,
} from "./AnalyticsPageBottomSectionMainContentElements";
import MainBarChart from "./AnalyticsMainBarChart";
import { CiHeartIcon, IoChatboxOutlineIcon } from "./AnalyticsIconElements";
import myPosts from "./AnalyticsPostsData.json";
import { lastAmountOfDays, lastAmountOfMinAgo,  timeBtns } from "./AnalyticsUtils";
import Visitors from "./AnalyticsVisitorsData.json";


const AnalyticsPageBottomSectionMainContent = () => {
    const dateString = myPosts.map((myPost) => {
        return myPost.datetime;
    });
    console.log(dateString);

    const datetime = dateString[0];
    const splittedDay = datetime.split(":");
    const myDate = splittedDay[0];
    const mySplittedDate = myDate.split("-");
    const myDayTime = mySplittedDate[2].split("T");

    const myDay = myDayTime[0];
    const myMonth = mySplittedDate[1];
    const myYear = mySplittedDate[0];

    const postDate = myDay + "-" + myMonth + "-" + myYear;

    console.log("dayMonthYear:", postDate);
    // TODO: Dynamicallly call postDate

    return (
        <BottomSection>
            <BottomLeftSection>
                <BottomLeftSectionCaption>
                    <BottomSectionCaptionTitle>
                        <Title>{Visitors[0].title}</Title>
                        <LastUpdated>Last updated {lastAmountOfMinAgo} min ago</LastUpdated>
                    </BottomSectionCaptionTitle>
                    <CTABtn>
                        <TimeCaptionBtnHours>{timeBtns[0].time}</TimeCaptionBtnHours>
                        <TimeCaptionBtnDays>{timeBtns[1].time}</TimeCaptionBtnDays>
                    </CTABtn>
                </BottomLeftSectionCaption>
                <InnerCard>
                    <MainBarChart />
                </InnerCard>
            </BottomLeftSection>
            <BottomRightSection>
                <Caption>
                    <BottomSectionCaptionTitle>
                        <Title>Popular Post </Title>
                        <LastUpdated>Last updated {lastAmountOfMinAgo} min ago</LastUpdated>
                    </BottomSectionCaptionTitle>
                    <CTABtn>
                        <LastThirtyDaysBtn>Last {lastAmountOfDays} days</LastThirtyDaysBtn>
                    </CTABtn>
                </Caption>
                <BottomRightSectionInnerCard>
                    {myPosts.map((myPost) => (
                        <PopularPostCard key={myPost.id}>
                            <PostDetails>
                                <PostTitleDate>
                                    <PostTitle>{myPost.title}</PostTitle>
                                    <PostDate>{myPost.datetime}</PostDate>
                                </PostTitleDate>
                            </PostDetails>
                            <PostIcons>
                                <LikesIcon>
                                    <CiHeartIcon />
                                    {myPost.likes}
                                </LikesIcon>
                                <CommentsIcon>
                                    <IoChatboxOutlineIcon />
                                    {myPost.views}
                                </CommentsIcon>
                            </PostIcons>
                        </PopularPostCard>
                    ))}
                </BottomRightSectionInnerCard>
            </BottomRightSection>
        </BottomSection>
    );
};

export default AnalyticsPageBottomSectionMainContent;
