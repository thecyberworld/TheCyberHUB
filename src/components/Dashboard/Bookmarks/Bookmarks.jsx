import React, { useEffect } from "react";
import { BookmarksContainer } from "./BookmarksElements";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarks } from "src/features/bookmarks/bookmarkSlice";
import FeedPosts from "src/components/Feeds/FeedPosts/FeedPosts";
import { getAllFeeds } from "src/features/feeds/feedsSlice";
import { getAllUserDetails } from "src/features/userDetail/userDetailSlice";
import LoadingSpinner from "src/components/Other/MixComponents/Spinner/LoadingSpinner";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "src/features/apiStatus";

const Bookmarks = () => {
    const dispatch = useDispatch();
    const { isApiLoading, isApiWorking } = apiStatus();

    const { bookmarks } = useSelector((state) => state.bookmarks);
    const { feeds, isFeedLoading } = useSelector((state) => state.feeds);
    const { userDetails, isUserDetailLoading } = useSelector((state) => state.userDetail);

    useEffect(() => {
        dispatch(getBookmarks());
        dispatch(getAllFeeds());
        dispatch(getAllUserDetails());
    }, [dispatch]);

    const feedBookmarksData = bookmarks.map((bookmark) => {
        const feed = feeds.find((feed) => feed?._id === bookmark?.itemId && bookmark?.itemType === "feed") || {};

        const userDetail = userDetails?.find((userDetail) => userDetail?.user === feed?.user);
        const { username, avatar, verified } = userDetail || {};
        return { ...feed, username, avatar, verified };
    });

    const filteredFeedBookmarksData = feedBookmarksData.filter((feed) => feed.user);
    if (isApiLoading || isUserDetailLoading || isFeedLoading) return <LoadingSpinner />;

    if (!isApiWorking) return <UnderMaintenance />;

    return (
        <BookmarksContainer>
            <FeedPosts feeds={filteredFeedBookmarksData} isFeedLoading={isFeedLoading} />
        </BookmarksContainer>
    );
};

export default Bookmarks;
