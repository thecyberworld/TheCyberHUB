import React, { useEffect } from "react";
import {
    AnalyticsHeader,
    Container,
    TopSection,
    BottomSection,
    BottomLeftSection,
    BottomRightSection,
    TopSectionCaption,
    TopSectionCaptionTitle,
    TopSectionCaptionCTABtn,
    TopSectionCaptionCTABtnBig,
    TopSectionMainContent,
    TopSectionInnerCard,
    Post,
    Title,
    AnalyticsContainer,
} from "./AnalyticsElements";
import { getFeeds } from "../../../features/feeds/feedsSlice";
import { getBlogs } from "../../../features/blogs/blogSlice";
import { getViews } from "../../../features/feeds/views/viewSlice";
import { useSelector, useDispatch } from "react-redux";

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
                        <TopSectionInnerCard>
                            <Title>Top mid section</Title>
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
                        <TopSectionInnerCard>
                            <Title>Top right section</Title>
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

                </TopSection>
                <BottomSection>
                <BottomLeftSection>
                    <Title>Bottom left section</Title>
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
                </BottomLeftSection>
                <BottomRightSection>
                    <Title>Bottom right section</Title>
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
                </BottomRightSection>
                </BottomSection>

              
               
            </Container>
        </AnalyticsContainer>
    );
};

export default Analytics;
