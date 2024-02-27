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
    TopSectionInnerCardCaption,
    TopSectionInnerCardMainSectionSummary,
    MainFigure,
    FigureInPercent,
    TopSectionInnerCardMainSectionChart,
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
} from "./AnalyticsElements";
import { getFeeds } from "../../../features/feeds/feedsSlice";
import { getBlogs } from "../../../features/blogs/blogSlice";
import { getViews } from "../../../features/feeds/views/viewSlice";
import { useSelector, useDispatch } from "react-redux";
import BarChart from "./AnalyticsBarChart";
import MainBarChart from "./AnalyticsMainBarChart";
// import DoughnutChart from "./AnalyticsPieChart";

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
                            <Title>Top section caption</Title>
                        </TopSectionCaptionTitle>

                        <TopSectionCaptionCTABtn>
                            <TopSectionCaptionCTABtnBig>
                                CTA Btn1
                            </TopSectionCaptionCTABtnBig>
                            <TopSectionCaptionCTABtnBig>
                                CTA Btn2
                            </TopSectionCaptionCTABtnBig>
                        </TopSectionCaptionCTABtn>

                    </TopSectionCaption>

                    <TopSectionMainContent>
                        <TopSectionInnerCard>
                            <TopSectionInnerCardCaption>
                                        <TopSectionInnerCardCaptionTitle>
                                            <Title>Top left section</Title>
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
                                    {/* <Title>Top left Bar chart section </Title> */}
                                <BarChart />

                                </TopSectionInnerCardMainSectionChart>         
                            </TopSectionInnerCardMainSection>
                        </TopSectionInnerCard>
                        <TopSectionInnerCard>
                        <TopSectionInnerCardCaption>
                                        <TopSectionInnerCardCaptionTitle>
                                            <Title>Top left section</Title>
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
                                    <Title>Top mid line chart section </Title>
                                </TopSectionInnerCardMainSectionChart>         
                            </TopSectionInnerCardMainSection>
                        </TopSectionInnerCard>
                        <TopSectionInnerCard>
                        <TopSectionInnerCardCaption>
                                        <TopSectionInnerCardCaptionTitle>
                                            <Title>Top right section</Title>
                                        </TopSectionInnerCardCaptionTitle>
                                        <LastThirtyDaysBtn>
                                            Last 30 days
                                        </LastThirtyDaysBtn>            
                            </TopSectionInnerCardCaption>
                            <TopSectionInnerCardMainSection>
                                <TopSectionInnerCardMainSectionSummary>
                                    <Title>Top right section Bar chart</Title>
                                    <LastThirtyDaysBtn>
                                        num
                                    </LastThirtyDaysBtn>  
                                </TopSectionInnerCardMainSectionSummary>
                                <TopSectionInnerCardMainSectionChart>
                                    <Title>Top right Bar chart section </Title>
                                </TopSectionInnerCardMainSectionChart>         
                            </TopSectionInnerCardMainSection>  
                        </TopSectionInnerCard>
                    </TopSectionMainContent>

                </TopSection>
                <BottomSection>
                    <BottomLeftSection>
                        <BottomLeftSectionCaption>     
                            <BottomSectionCaptionTitle>
                                <Title>Bottom left section</Title>
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
                                <Title>Bottom left section</Title>
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
                                <Title>Bottom right </Title>
                                <LastUpdated>Last updated 14 min ago</LastUpdated>
                            </BottomSectionCaptionTitle>


                            <TopSectionCaptionCTABtn>
                                <LastThirtyDaysBtn>
                                    Last 30 days
                                </LastThirtyDaysBtn>

                            </TopSectionCaptionCTABtn>
                        </TopSectionCaption>

                        <TopSectionMainContent>
                            <TopSectionInnerCard>
                                <Title>Top left section</Title>
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
                            </TopSectionInnerCard>
                        </TopSectionMainContent>
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
