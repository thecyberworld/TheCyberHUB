import React from "react";
import {
    FeedPostContainer,
    LeftSection,
    PostContent,
    PostHeader,
    PostHeaderImg,
    PostHeaderUsername,
    PostTag,
    PostTags,
    PostTimestamp,
    RightHeaderSection,
    RightSection,
} from "./FeedPostsElements";
import PostActionsAndStats from "./PostActionsAndStats";
import { RouteLink } from "src/components/Common/GeneralDashboardSidebar/GeneralDashboardSidebarElements";
import { dateFormatter } from "src/components/Common/dateFormatter";
import { ImageContainer, ImagesContainer, FeedImage } from "src/components/Feeds/PostForm/AddPostElements";
import { IconVerified } from "src/components/Explore/Users/UsersElements";
import { cdnContentImagesUrl } from "src/features/apiUrl";
import Options from "src/components/Common/ModalWindowOptions";
import { deleteFeed } from "src/features/feeds/feedsSlice";
import { useDispatch } from "react-redux";

const FeedPost = ({ feed, user, comments, likes, bookmarks, views, setStopRefresh, displayAt }) => {
    const dispatch = useDispatch();
    const avatar = cdnContentImagesUrl("/user/" + (feed?.avatar || "avatarDummy.png"));
    const feedImage = (image) => cdnContentImagesUrl(`/feed/${image}`);
    const handleDeleteFeed = () => dispatch(deleteFeed(feed._id));

    return (
        <FeedPostContainer displayAt={displayAt}>
            <RightSection>
                <RouteLink to={`/feeds/${feed?._id}`}>
                    <PostHeader>
                        <LeftSection
                            style={{
                                alignItems: "center",
                            }}
                        >
                            <PostHeaderImg src={avatar} alt={feed?.username + ` avatar`} />
                            <PostHeaderUsername>{feed?.username}</PostHeaderUsername>
                            {feed?.verified && <IconVerified />}
                        </LeftSection>
                        <RightHeaderSection>
                            <PostTimestamp>{dateFormatter({ date: new Date(feed?.createdAt) })}</PostTimestamp>
                            {user._id === feed.user && <Options onDelete={handleDeleteFeed} />}
                        </RightHeaderSection>
                    </PostHeader>
                    <PostContent>
                        {feed?.content.slice(0, 225)}
                        {feed?.content.length > 225 && (
                            <>
                                ... <span style={{ color: "#ff6b08" }}> show more.</span>
                            </>
                        )}
                    </PostContent>
                </RouteLink>

                <RouteLink to={`/feeds/${feed?._id}`}>
                    {feed?.images?.length > 0 ? (
                        <ImagesContainer>
                            {feed?.images?.map((image, index) => (
                                <ImageContainer key={index}>
                                    <FeedImage src={feedImage(image)} alt={feed?.username + ` image ${index + 1}`} />
                                </ImageContainer>
                            ))}
                        </ImagesContainer>
                    ) : null}
                </RouteLink>

                {feed?.tags?.length > 0 ? (
                    <PostTags>{feed?.tags?.map((tag, id) => tag !== "" && <PostTag key={id}>{tag}</PostTag>)}</PostTags>
                ) : null}

                <PostActionsAndStats
                    feed={feed}
                    user={user}
                    itemType={"feed"}
                    comments={comments}
                    likes={likes}
                    bookmarks={bookmarks}
                    views={views}
                    setStopRefresh={setStopRefresh}
                />
            </RightSection>
        </FeedPostContainer>
    );
};

export default FeedPost;
