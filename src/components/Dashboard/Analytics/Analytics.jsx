import React, { useEffect } from "react";
import {
    AnalyticsHeader,
    Container,
    TopSection,
    BottomSection,
    BottomLeftSection,
    BottomLeftSectionCaption,
    BottomSectionCaptionTitle,
    TimeCaptionBtn,
    TimeCaptionBtnTwo,
    BottomRightSection,
    TopSectionCaption,
    TopSectionInnerCardCaptionTitle,
    TopSectionInnerCardMainSection,
    HorizontalStackedBarSection,
    HorizontalStackedBarLabel,
    HorizontalStackedBarFirstLabel,
    HorizontalStackedBarSecondLabel,
    TopSectionInnerCardMainSectionDateRangeStart,
    TopSectionInnerCardMainSectionDateRangeEnd,
    TopSectionInnerCardCaption,
    TopSectionInnerCardMainSectionSummary,
    MainFigure,
    FigureInPercent,
    TopSectionInnerCardMainSectionChart,
    TopSectionInnerCardMainSectionDateRange,
    TopSectionCaptionTitle,
    TopSectionCaptionCTABtn,
    LastThirtyDaysBtn,
    TopSectionCaptionCTABtnBig,
    TopSectionMainContent,
    TopSectionInnerCard,
    Post,
    Title,
    AnalyticsContainer,
    LastUpdated,
    BottomRightSectionMainCard,
    BottomRightSectionInnerCard,
    PopularPostCardCaption
} from "./AnalyticsElements";
import { getFeeds } from "../../../features/feeds/feedsSlice";
import { getBlogs } from "../../../features/blogs/blogSlice";
import { getViews } from "../../../features/feeds/views/viewSlice";
import { useSelector, useDispatch } from "react-redux";
import BarChart from "./AnalyticsBarChart";
import MainBarChart from "./AnalyticsMainBarChart";
import { Doughnut } from "./AnalyticsDoughnutChart";
import HorizontalStackedBar from "./AnalyticsStackedBar";

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
                    <TopSectionCaption>
                        <TopSectionCaptionTitle>
                            <Title>Audience</Title>
                        </TopSectionCaptionTitle>
                        <TopSectionCaptionCTABtn>
                            <TopSectionCaptionCTABtnBig>
                            Last 30 days
                            </TopSectionCaptionCTABtnBig>
                            <TopSectionCaptionCTABtnBig>
                                Downloaded
                            </TopSectionCaptionCTABtnBig>
                        </TopSectionCaptionCTABtn>
                    </TopSectionCaption>
                    <TopSectionMainContent>
                        <TopSectionInnerCard>
                            <TopSectionInnerCardCaption>
                                        <TopSectionInnerCardCaptionTitle>
                                            <Title>Most Active Times</Title>
                                        </TopSectionInnerCardCaptionTitle>
                                        <LastThirtyDaysBtn>
                                            Last 30 days
                                        </LastThirtyDaysBtn>          
                            </TopSectionInnerCardCaption>
                            <TopSectionInnerCardMainSection>
                                <TopSectionInnerCardMainSectionSummary>
                                    <MainFigure>1.234</MainFigure>
                                    <FigureInPercent>
                                        +89.67%
                                    </FigureInPercent>  
                                </TopSectionInnerCardMainSectionSummary>
                                <TopSectionInnerCardMainSectionChart>                         
                                <BarChart />
                                </TopSectionInnerCardMainSectionChart></TopSectionInnerCardMainSection>
                        </TopSectionInnerCard>
                        <TopSectionInnerCard>
                        <TopSectionInnerCardCaption>
                            <TopSectionInnerCardCaptionTitle>
                                <Title>Total Visitor</Title>
                                </TopSectionInnerCardCaptionTitle>
                                        <LastThirtyDaysBtn>
                                            Last 30 days
                                        </LastThirtyDaysBtn>            
                        </TopSectionInnerCardCaption>
                            <TopSectionInnerCardMainSection>
                                <TopSectionInnerCardMainSectionSummary>
                                    <MainFigure>1.004</MainFigure>
                                    <FigureInPercent>
                                        +71.80%
                                    </FigureInPercent>  
                                </TopSectionInnerCardMainSectionSummary>
                                <TopSectionInnerCardMainSectionChart>
                                    <HorizontalStackedBarSection>                     
                                        <HorizontalStackedBarLabel>                          
                                            <HorizontalStackedBarFirstLabel>
                                                Mobile
                                            </HorizontalStackedBarFirstLabel>
                                            <HorizontalStackedBarSecondLabel>
                                                Desktop
                                            </HorizontalStackedBarSecondLabel>
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
                        </TopSectionInnerCard>
                        <TopSectionInnerCard>
                        <TopSectionInnerCardCaption>
                                        <TopSectionInnerCardCaptionTitle>
                                            <Title>Age Average</Title>
                                        </TopSectionInnerCardCaptionTitle>
                                        <LastThirtyDaysBtn>
                                            Last 30 days
                                        </LastThirtyDaysBtn>            
                            </TopSectionInnerCardCaption>
                            <TopSectionInnerCardMainSection>
                                <TopSectionInnerCardMainSectionChart>
                                    <Doughnut />
                                </TopSectionInnerCardMainSectionChart>         
                            </TopSectionInnerCardMainSection>  
                        </TopSectionInnerCard>
                    </TopSectionMainContent>
                </TopSection>
                <BottomSection>
                    <BottomLeftSection>
                        <BottomLeftSectionCaption>     
                            <BottomSectionCaptionTitle>
                                <Title>Most Active Times</Title>
                                <LastUpdated>Last updated 14 min ago</LastUpdated>
                            </BottomSectionCaptionTitle>
                            <TopSectionCaptionCTABtn>
                                <TimeCaptionBtn>
                                    Hours
                                </TimeCaptionBtn>
                                <TimeCaptionBtnTwo>
                                    Days
                                </TimeCaptionBtnTwo>
                            </TopSectionCaptionCTABtn>
                        </BottomLeftSectionCaption>
                        <TopSectionMainContent>
                            <TopSectionInnerCard>
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
                                {/* <BarChart /> */}
                                <MainBarChart />
                                {/* <DoughnutChart/> */}
                            </TopSectionInnerCard>
                        </TopSectionMainContent>
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
                        <TopSectionCaption>
                            <BottomSectionCaptionTitle>
                                <Title>Popular Post </Title>
                                <LastUpdated>Last updated 14 min ago</LastUpdated>
                            </BottomSectionCaptionTitle>
                            <TopSectionCaptionCTABtn>
                                <LastThirtyDaysBtn>
                                    Last 30 days
                                </LastThirtyDaysBtn>
                            </TopSectionCaptionCTABtn>
                        </TopSectionCaption>

                        <BottomRightSectionMainCard>
                            <BottomRightSectionInnerCard>
                                <PopularPostCardCaption>
                                        <TopSectionInnerCardCaptionTitle>
                                            <Title>Post title</Title>
                                        </TopSectionInnerCardCaptionTitle>
                                        <LastThirtyDaysBtn>
                                            Last 30 days
                                        </LastThirtyDaysBtn>            
                                </PopularPostCardCaption>
                                <PopularPostCardCaption>
                                        <TopSectionInnerCardCaptionTitle>
                                            <Title>Post title</Title>
                                        </TopSectionInnerCardCaptionTitle>
                                        <LastThirtyDaysBtn>
                                            Last 30 days
                                        </LastThirtyDaysBtn>            
                                </PopularPostCardCaption>
                                <PopularPostCardCaption>
                                        <TopSectionInnerCardCaptionTitle>
                                            <Title>Post title</Title>
                                        </TopSectionInnerCardCaptionTitle>
                                        <LastThirtyDaysBtn>
                                            Last 30 days
                                        </LastThirtyDaysBtn>            
                                </PopularPostCardCaption>
                                <PopularPostCardCaption>
                                        <TopSectionInnerCardCaptionTitle>
                                            <Title>Post title</Title>
                                        </TopSectionInnerCardCaptionTitle>
                                        <LastThirtyDaysBtn>
                                            Last 30 days
                                        </LastThirtyDaysBtn>            
                                </PopularPostCardCaption>
                                <PopularPostCardCaption>
                                        <TopSectionInnerCardCaptionTitle>
                                            <Title>Post title</Title>
                                        </TopSectionInnerCardCaptionTitle>
                                        <LastThirtyDaysBtn>
                                            Last 30 days
                                        </LastThirtyDaysBtn>            
                                </PopularPostCardCaption>
                                <PopularPostCardCaption>
                                        <TopSectionInnerCardCaptionTitle>
                                            <Title>Post title</Title>
                                        </TopSectionInnerCardCaptionTitle>
                                        <LastThirtyDaysBtn>
                                            Last 30 days
                                        </LastThirtyDaysBtn>            
                                </PopularPostCardCaption>
                                <PopularPostCardCaption>
                                        <TopSectionInnerCardCaptionTitle>
                                            <Title>Post title</Title>
                                        </TopSectionInnerCardCaptionTitle>
                                        <LastThirtyDaysBtn>
                                            Last 30 days
                                        </LastThirtyDaysBtn>            
                                </PopularPostCardCaption>
                                <PopularPostCardCaption>
                                        <TopSectionInnerCardCaptionTitle>
                                            <Title>Post title</Title>
                                        </TopSectionInnerCardCaptionTitle>
                                        <LastThirtyDaysBtn>
                                            Last 30 days
                                        </LastThirtyDaysBtn>            
                                </PopularPostCardCaption>
                                <PopularPostCardCaption>
                                        <TopSectionInnerCardCaptionTitle>
                                            <Title>Post title</Title>
                                        </TopSectionInnerCardCaptionTitle>
                                        <LastThirtyDaysBtn>
                                            Last 30 days
                                        </LastThirtyDaysBtn>            
                                </PopularPostCardCaption>
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
                        </BottomRightSectionMainCard>
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
