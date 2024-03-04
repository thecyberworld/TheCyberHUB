import React, { useEffect } from "react";
import {
    AnalyticsContainer,
    AnalyticsHeader,
    Container,
    TopSection,
    Caption,
    TopSectionCaptionTitle,
    Title,
    CTABtn,
    TopSectionCaptionCTABtnBig,
    TopSectionCaptionCTABtnBigInnerSection,
    TopSectionMainContent,
    InnerCard,
    TopSectionInnerCardCaption,
    TopSectionInnerCardCaptionTitle,
    LastThirtyDaysBtn,
    MainFigure,
    FigureInPercent,
    TopSectionInnerCardMainSectionSummary,
    TopSectionInnerCardMainSection,
    TopSectionInnerCardMainSectionChart,
    HorizontalStackedBarSection,
    HorizontalStackedBarLabel,
    HorizontalStackedBarFirstLabel,
    HorizontalStackedBarSecondLabel,
    TopSectionInnerCardMainSectionDateRange,
    TopSectionInnerCardMainSectionDateRangeStart,
    TopSectionInnerCardMainSectionDateRangeEnd,
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
    Post,
} from "./AnalyticsElements";
import { getFeeds } from "../../../features/feeds/feedsSlice";
import { getBlogs } from "../../../features/blogs/blogSlice";
import { getViews } from "../../../features/feeds/views/viewSlice";
import { useSelector, useDispatch } from "react-redux";
import BarChart from "./AnalyticsBarChart";
import HorizontalStackedBar from "./AnalyticsStackedBar";
import { DoughnutChart } from "./AnalyticsDoughnutChart";
import MainBarChart from "./AnalyticsMainBarChart";
import {
    FiInfoIcon,
    SlCalenderIcon,
    TbFileDownloadIcon,
    CiHeartIcon,
    IoChatboxOutlineIcon,
} from "./AnalyticsIconElements";

const Analytics = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const feedData = useSelector((state) => state.feeds);
    // const feedViewsData = useSelector((state) => state.views);
    const blogData = useSelector((state) => state.blogs);
    const userId = user._id;

    useEffect(() => {
        if (userId) {
            dispatch(getBlogs());
            dispatch(getViews());
            dispatch(getFeeds());
        }
    }, [dispatch, userId]);

    // const totalFeedsViews = AnalyticsData.reduce((total, post) => {
    //     return post?.category === "feed" ? total + post?.views : total;
    // }, 0);

    // const totalFeedsViews = feedViewsData.views.length;

    // const totalBlogsViews = AnalyticsData.reduce((total, post) => {
    //     return post?.category === "blog" ? total + post?.views : total;
    // }, 0);
    const dummyData = 999;

    return (
        <AnalyticsContainer>
            <AnalyticsHeader>
                <h1>Analytics</h1>
            </AnalyticsHeader>
            <Container>
                <TopSection>
                    <Caption>
                        <TopSectionCaptionTitle>
                            <Title>Audience </Title>
                            <FiInfoIcon />
                        </TopSectionCaptionTitle>
                        <CTABtn>
                            <TopSectionCaptionCTABtnBig>
                                <TopSectionCaptionCTABtnBigInnerSection>
                                    Last 30 days
                                    <SlCalenderIcon />
                                </TopSectionCaptionCTABtnBigInnerSection>
                            </TopSectionCaptionCTABtnBig>
                            <TopSectionCaptionCTABtnBig>
                                <TopSectionCaptionCTABtnBigInnerSection>
                                    Download
                                    <TbFileDownloadIcon />
                                </TopSectionCaptionCTABtnBigInnerSection>
                            </TopSectionCaptionCTABtnBig>
                        </CTABtn>
                    </Caption>
                    <TopSectionMainContent>
                        <InnerCard>
                            <TopSectionInnerCardCaption>
                                <TopSectionInnerCardCaptionTitle>
                                    <Title>Most Active Times</Title>
                                </TopSectionInnerCardCaptionTitle>
                                <LastThirtyDaysBtn>Last 30 days</LastThirtyDaysBtn>
                            </TopSectionInnerCardCaption>
                            <TopSectionInnerCardMainSection>
                                <TopSectionInnerCardMainSectionSummary>
                                    <MainFigure>1.234</MainFigure>
                                    <FigureInPercent>+89.67%</FigureInPercent>
                                </TopSectionInnerCardMainSectionSummary>
                                <TopSectionInnerCardMainSectionChart>
                                    <BarChart />
                                </TopSectionInnerCardMainSectionChart>
                            </TopSectionInnerCardMainSection>
                        </InnerCard>
                        <InnerCard>
                            <TopSectionInnerCardCaption>
                                <TopSectionInnerCardCaptionTitle>
                                    <Title>Total Visitor</Title>
                                </TopSectionInnerCardCaptionTitle>
                                <LastThirtyDaysBtn>Last 30 days</LastThirtyDaysBtn>
                            </TopSectionInnerCardCaption>
                            <TopSectionInnerCardMainSection>
                                <TopSectionInnerCardMainSectionSummary>
                                    <MainFigure>1.004</MainFigure>
                                    <FigureInPercent>+71.80%</FigureInPercent>
                                </TopSectionInnerCardMainSectionSummary>
                                <TopSectionInnerCardMainSectionChart>
                                    <HorizontalStackedBarSection>
                                        <HorizontalStackedBarLabel>
                                            <HorizontalStackedBarFirstLabel>Mobile</HorizontalStackedBarFirstLabel>
                                            <HorizontalStackedBarSecondLabel>Desktop</HorizontalStackedBarSecondLabel>
                                        </HorizontalStackedBarLabel>
                                        <HorizontalStackedBar />
                                        <TopSectionInnerCardMainSectionDateRange>
                                            <TopSectionInnerCardMainSectionDateRangeStart>
                                                11 Oct, 2021
                                            </TopSectionInnerCardMainSectionDateRangeStart>
                                            <TopSectionInnerCardMainSectionDateRangeEnd>
                                                11 Nov, 2021
                                            </TopSectionInnerCardMainSectionDateRangeEnd>
                                        </TopSectionInnerCardMainSectionDateRange>
                                    </HorizontalStackedBarSection>
                                </TopSectionInnerCardMainSectionChart>
                            </TopSectionInnerCardMainSection>
                        </InnerCard>
                        <InnerCard>
                            <TopSectionInnerCardCaption>
                                <TopSectionInnerCardCaptionTitle>
                                    <Title>Age Average</Title>
                                </TopSectionInnerCardCaptionTitle>
                                <LastThirtyDaysBtn>Last 30 days</LastThirtyDaysBtn>
                            </TopSectionInnerCardCaption>
                            <TopSectionInnerCardMainSection>
                                {/* <TopSectionInnerCardMainSectionChart> */}
                                    <DoughnutChart />
                                {/* </TopSectionInnerCardMainSectionChart> */}
                            </TopSectionInnerCardMainSection>
                        </InnerCard>
                    </TopSectionMainContent>
                </TopSection>
                <BottomSection>
                    <BottomLeftSection>
                        <BottomLeftSectionCaption>
                            <BottomSectionCaptionTitle>
                                <Title>Most Active Times</Title>
                                <LastUpdated>Last updated 14 min ago</LastUpdated>
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
                        {/* {blogData.blogs?.map((post) => (
                            <Post key={post?._id}>
                                <h3>{post?.summary}</h3>
                                <p>
                                    Type: {post?.category} | Views: {post?.views || dummyData} | Time:{" "}
                                    {post?.updatedAt || post?.createdAt}
                                </p>
                            </Post>
                        ))}
                        {feedData.feed?.map((post) => (
                            <Post key={post?._id}>
                                <h3>{post?.content}</h3>
                                <p>
                                    Type: Feed | Views: {post?.views || dummyData} | Time:{" "}
                                    {post?.updatedAt || post?.createdAt}
                                </p>
                            </Post>
                        ))} */}
                        <Caption>
                            <BottomSectionCaptionTitle>
                                <Title>Popular Post </Title>
                                <LastUpdated>Last updated 14 min ago</LastUpdated>
                            </BottomSectionCaptionTitle>
                            <CTABtn>
                                <LastThirtyDaysBtn>Last 30 days</LastThirtyDaysBtn>
                            </CTABtn>
                        </Caption>
                        <BottomRightSectionInnerCard>
                            <PopularPostCard>
                                <PostDetails>
                                    <PostTitleDate>
                                        <PostTitle>Learn to build servers</PostTitle>
                                        <PostDate>May 26</PostDate>
                                    </PostTitleDate>
                                </PostDetails>
                                <PostIcons>
                                    <LikesIcon>
                                        <CiHeartIcon />
                                        30.5K
                                    </LikesIcon>
                                    <CommentsIcon>
                                        <IoChatboxOutlineIcon />
                                        56K
                                    </CommentsIcon>
                                </PostIcons>
                            </PopularPostCard>
                            <PopularPostCard>
                                <PostDetails>
                                    <PostTitleDate>
                                        <PostTitle>Understanding Linux OS Begginers level</PostTitle>
                                        <PostDate>May 26</PostDate>
                                    </PostTitleDate>
                                </PostDetails>
                                <PostIcons>
                                    <LikesIcon>
                                        <CiHeartIcon />
                                        102.7K
                                    </LikesIcon>
                                    <CommentsIcon>
                                        <IoChatboxOutlineIcon />
                                        86K
                                    </CommentsIcon>
                                </PostIcons>
                            </PopularPostCard>
                            <PopularPostCard>
                                <PostDetails>
                                    <PostTitleDate>
                                        <PostTitle>Master the basics of Git</PostTitle>
                                        <PostDate>Mar 06</PostDate>
                                    </PostTitleDate>
                                </PostDetails>
                                <PostIcons>
                                    <LikesIcon>
                                        <CiHeartIcon />
                                        9.3K
                                    </LikesIcon>
                                    <CommentsIcon>
                                        <IoChatboxOutlineIcon />
                                        16K
                                    </CommentsIcon>
                                </PostIcons>
                            </PopularPostCard>
                            <PopularPostCard>
                                <PostDetails>
                                    <PostTitleDate>
                                        <PostTitle>Learn to build servers </PostTitle>
                                        <PostDate>May 26</PostDate>
                                    </PostTitleDate>
                                </PostDetails>
                                <PostIcons>
                                    <LikesIcon>
                                        <CiHeartIcon />
                                        30.5K
                                    </LikesIcon>
                                    <CommentsIcon>
                                        <IoChatboxOutlineIcon />
                                        56K
                                    </CommentsIcon>
                                </PostIcons>
                            </PopularPostCard>
                            <PopularPostCard>
                                <PostDetails>
                                    <PostTitleDate>
                                        <PostTitle>Understanding Linux OS</PostTitle>
                                        <PostDate>May 26</PostDate>
                                    </PostTitleDate>
                                </PostDetails>
                                <PostIcons>
                                    <LikesIcon>
                                        <CiHeartIcon />
                                        102.7K
                                    </LikesIcon>
                                    <CommentsIcon>
                                        <IoChatboxOutlineIcon />
                                        86K
                                    </CommentsIcon>
                                </PostIcons>
                            </PopularPostCard>
                            <PopularPostCard>
                                <PostDetails>
                                    <PostTitleDate>
                                        <PostTitle>Master the basics of Git</PostTitle>
                                        <PostDate>Mar 06</PostDate>
                                    </PostTitleDate>
                                </PostDetails>
                                <PostIcons>
                                    <LikesIcon>
                                        <CiHeartIcon />
                                        9.3K
                                    </LikesIcon>
                                    <CommentsIcon>
                                        <IoChatboxOutlineIcon />
                                        16K
                                    </CommentsIcon>
                                </PostIcons>
                            </PopularPostCard>
                            <PopularPostCard>
                                <PostDetails>
                                    <PostTitleDate>
                                        <PostTitle>Learn to build servers </PostTitle>
                                        <PostDate>May 26</PostDate>
                                    </PostTitleDate>
                                </PostDetails>
                                <PostIcons>
                                    <LikesIcon>
                                        <CiHeartIcon />
                                        30.5K
                                    </LikesIcon>
                                    <CommentsIcon>
                                        <IoChatboxOutlineIcon />
                                        56K
                                    </CommentsIcon>
                                </PostIcons>
                            </PopularPostCard>
                            <PopularPostCard>
                                <PostDetails>
                                    <PostTitleDate>
                                        <PostTitle>Understanding Linux OS</PostTitle>
                                        <PostDate>May 26</PostDate>
                                    </PostTitleDate>
                                </PostDetails>
                                <PostIcons>
                                    <LikesIcon>
                                        <CiHeartIcon />
                                        102.7K
                                    </LikesIcon>
                                    <CommentsIcon>
                                        <IoChatboxOutlineIcon />
                                        86K
                                    </CommentsIcon>
                                </PostIcons>
                            </PopularPostCard>
                            <PopularPostCard>
                                <PostDetails>
                                    <PostTitleDate>
                                        <PostTitle>Master the basics of Git</PostTitle>
                                        <PostDate>Mar 06</PostDate>
                                    </PostTitleDate>
                                </PostDetails>
                                <PostIcons>
                                    <LikesIcon>
                                        <CiHeartIcon />
                                        9.3K
                                    </LikesIcon>
                                    <CommentsIcon>
                                        <IoChatboxOutlineIcon />
                                        16K
                                    </CommentsIcon>
                                </PostIcons>
                            </PopularPostCard>

                            {blogData.blogs?.map((post) => (
                                <Post key={post?._id}>
                                    <h3>{post?.summary}</h3>
                                    <p>
                                        Type: {post?.category} | Views: {post?.views || dummyData} | Time:{" "}
                                        {post?.updatedAt || post?.createdAt}
                                    </p>
                                </Post>
                            ))}
                            {feedData.feed?.map((post) => (
                                <Post key={post?._id}>
                                    <h3>{post?.content}</h3>
                                    <p>
                                        Type: Feed | Views: {post?.views || dummyData} | Time:{" "}
                                        {post?.updatedAt || post?.createdAt}
                                    </p>
                                </Post>
                            ))}
                        </BottomRightSectionInnerCard>
                        {/* {AnalyticsData.slice(0, 10).map((post) => (
                            <Post key={post?.id}>
                                <h3>{post?.title}</h3>
                                <p>
                                    Type: {post?.category} | Views: {post?.views} | Time: {post?.datetime}
                                </p>
                            </Post>
                        ))} */}
                    </BottomRightSection>
                </BottomSection>
            </Container>
        </AnalyticsContainer>
    );
};

export default Analytics;
