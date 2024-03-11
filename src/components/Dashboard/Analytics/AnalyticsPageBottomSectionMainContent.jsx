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
} from "./AnalyticsElements";
import MainBarChart from "./AnalyticsMainBarChart";
import { CiHeartIcon, IoChatboxOutlineIcon } from "./AnalyticsIconElements";
import { myPosts } from "./AnalyticsPostsData";
import { lastAmountOfDays, lastAmountOfMinAgo, postDate } from "./AnalyticsUtils";

const AnalyticsPageBottomSectionMainContent = () => {
    return (
      <BottomSection>
        <BottomLeftSection>
          <BottomLeftSectionCaption>
            <BottomSectionCaptionTitle>
              <Title>Most Active Times</Title>
              <LastUpdated>Last updated {lastAmountOfMinAgo} min ago</LastUpdated>
            </BottomSectionCaptionTitle>
            <CTABtn>
              <TimeCaptionBtnHours>Hours</TimeCaptionBtnHours>
              <TimeCaptionBtnDays>Days</TimeCaptionBtnDays>
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
              <LastUpdated>Last updated {lastAmountOfMinAgo} min ago
              </LastUpdated>
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
                    <PostDate>{postDate}</PostDate>
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
