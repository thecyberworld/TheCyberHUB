import React, { useEffect } from "react";
import {
    Header,
    Container,
    LeftSection,
    RightSection,
    Post,
    Title,
    SummaryItem,
    AnalyticsContainer,
} from "./AnalyticsElements";
import { getFeeds } from "src/features/feeds/feedsSlice";
import { getBlogs } from "src/features/blogs/blogSlice";
import { getViews } from "src/features/feeds/views/viewSlice";
import { useSelector, useDispatch } from "react-redux";

const Analytics = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const feedData = useSelector((state) => state.feeds);
    const feedViewsData = useSelector((state) => state.views);
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

    const totalFeedsViews = feedViewsData.views.length;

    // const totalBlogsViews = AnalyticsData.reduce((total, post) => {
    //     return post?.category === "blog" ? total + post?.views : total;
    // }, 0);
    const dummyData = 999;

    return (
        <AnalyticsContainer>
            <Header>
                <h1>Analytics</h1>
            </Header>
            <Container>
                <LeftSection>
                    <Title>Posts</Title>
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
                    {/* {AnalyticsData.slice(0, 10).map((post) => (
                        <Post key={post?.id}>
                            <h3>{post?.title}</h3>
                            <p>
                                Type: {post?.category} | Views: {post?.views} | Time: {post?.datetime}
                            </p>
                        </Post>
                    ))} */}
                </LeftSection>
                <RightSection>
                    <Title>Summary</Title>
                    <SummaryItem>
                        <h3>Total Views</h3>
                        <p>Total Views: {dummyData + totalFeedsViews}</p>
                    </SummaryItem>
                    <SummaryItem>
                        <h3>Feeds</h3>
                        <p>Total Views: {totalFeedsViews}</p>
                    </SummaryItem>
                    <SummaryItem>
                        <h3>Blogs</h3>
                        <p>Total Views: {dummyData}</p>
                    </SummaryItem>
                </RightSection>
            </Container>
        </AnalyticsContainer>
    );
};

export default Analytics;
