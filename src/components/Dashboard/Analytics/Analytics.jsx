import React, { useEffect } from "react";
import AnalyticsPageTopSectionMainContent from "./AnalyticsPageTopSectionMainContent";
import AnalyticsPageBottomSectionMainContent from "./AnalyticsPageBottomSectionMainContent";
import {
    AnalyticsContainer,
    AnalyticsHeader,
    Container,
} from "./AnalyticsElements";
import { getFeeds } from "../../../features/feeds/feedsSlice";
import { getBlogs } from "../../../features/blogs/blogSlice";
import { getViews } from "../../../features/feeds/views/viewSlice";
import { useSelector, useDispatch } from "react-redux";


const Analytics = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    // const feedData = useSelector((state) => state.feeds);
    // const feedViewsData = useSelector((state) => state.views);
    // const blogData = useSelector((state) => state.blogs);
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
    // const dummyData = 999;

    return (
        <AnalyticsContainer>
            <AnalyticsHeader>
                <h1>Analytics</h1>
            </AnalyticsHeader>
            <Container>
                <AnalyticsPageTopSectionMainContent />
                <AnalyticsPageBottomSectionMainContent />
                    
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
        
                            {/* {blogData.blogs?.map((post) => (
                                <Post key={post?._id}>
                                    <h3>{post?.summary}</h3>
                                    <p>
                                        Type: {post?.category} | Views: {post?.views || dummyData} | Time:{" "}
                                        {post?.updatedAt || post?.createdAt}
                                    </p>
                                </Post>
                            ))} */}
                            {/* {feedData.feed?.map((post) => (
                                <Post key={post?._id}>
                                    <h3>{post?.content}</h3>
                                    <p>
                                        Type: Feed | Views: {post?.views || dummyData} | Time:{" "}
                                        {post?.updatedAt || post?.createdAt}
                                    </p>
                                </Post>
                            ))} */}
            </Container>
        </AnalyticsContainer>
    );
};

export default Analytics;
