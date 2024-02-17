import React from "react";
import AnalyticsData from "./AnalyticsData";
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

const Analytics = () => {
    const totalFeedsViews = AnalyticsData.reduce((total, post) => {
        return post?.category === "feed" ? total + post?.views : total;
    }, 0);

    const totalBlogsViews = AnalyticsData.reduce((total, post) => {
        return post?.category === "blog" ? total + post?.views : total;
    }, 0);

    return (
        <AnalyticsContainer>
            <Header>
                <h1>Analytics</h1>
            </Header>
            <Container>
                <LeftSection>
                    <Title>Posts</Title>
                    {AnalyticsData.slice(0, 10).map((post) => (
                        <Post key={post?.id}>
                            <h3>{post?.title}</h3>
                            <p>
                                Type: {post?.category} | Views: {post?.views} | Time: {post?.datetime}
                            </p>
                        </Post>
                    ))}
                </LeftSection>
                <RightSection>
                    <Title>Summary</Title>
                    <SummaryItem>
                        <h3>Total Views</h3>
                        <p>Total Views: {totalFeedsViews + totalBlogsViews}</p>
                    </SummaryItem>
                    <SummaryItem>
                        <h3>Feeds</h3>
                        <p>Total Views: {totalFeedsViews}</p>
                    </SummaryItem>
                    <SummaryItem>
                        <h3>Blogs</h3>
                        <p>Total Views: {totalBlogsViews}</p>
                    </SummaryItem>
                </RightSection>
            </Container>
        </AnalyticsContainer>
    );
};

export default Analytics;
