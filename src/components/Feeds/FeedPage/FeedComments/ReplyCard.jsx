import React from "react";
import {
    FeedPostContainer,
    LeftSection,
    PostContent,
    PostHeader,
    PostHeaderImg,
    PostHeaderUsername,
    PostTimestamp,
    RightHeaderSection,
    RightSection,
} from "src/components/Feeds/FeedPosts/FeedPostsElements";
import { dateFormatter } from "src/components/Common/dateFormatter";
import PostActionsAndStats from "src/components/Feeds/FeedPosts/PostActionsAndStats";
import { cdnContentImagesUrl } from "src/features/apiUrl";
import FeedOptions from "src/components/Feeds/FeedOptions";

const ReplyCard = ({ reply, user, comments, likes, bookmarks, views, displayAt, updateFeedView }) => {
    const avatar = cdnContentImagesUrl("/user/" + (reply?.avatar || "avatarDummy.png"));

    return (
        <FeedPostContainer displayAt={displayAt}>
            <LeftSection>
                <PostHeaderImg src={avatar} alt={reply?.username + `avatar`} />
            </LeftSection>
            <RightSection>
                {/* <RouteLink to={`/feeds/${reply?._id}`}> */}
                <PostHeader>
                    <LeftSection>
                        <PostHeaderUsername>{reply?.username}</PostHeaderUsername> •
                    </LeftSection>
                    <RightHeaderSection>
                        <PostTimestamp>{dateFormatter({ date: new Date(reply?.createdAt) })}</PostTimestamp>
                        <FeedOptions />
                    </RightHeaderSection>
                </PostHeader>
                <PostContent>{reply?.reply}</PostContent>
                {/* </RouteLink> */}

                <PostActionsAndStats
                    feed={reply}
                    user={user}
                    itemType={"feed"}
                    comments={comments}
                    likes={likes}
                    bookmarks={bookmarks}
                    views={views}
                    updateFeedView={updateFeedView}
                />
            </RightSection>
        </FeedPostContainer>
    );
};

export default ReplyCard;
