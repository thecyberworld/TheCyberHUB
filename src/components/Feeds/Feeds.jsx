import React, { useState, useEffect } from "react";
import { FeedsContainer, FilterButton, FilterContainer, MiddleSection } from "./FeedsElements";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import AddFeed from "./PostForm/AddFeed";
import FeedPosts from "./FeedPosts/FeedPosts";
import { useDispatch, useSelector } from "react-redux";
import { feedReset, getAllFeeds } from "../../features/feeds/feedsSlice";
import { getAllUserDetails, userDetailReset } from "../../features/userDetail/userDetailSlice";
import LoadingSpinner from "../Other/MixComponents/Spinner/LoadingSpinner";
import UnderMaintenance from "../Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "../../features/apiStatus";
import FeedTags from "./FeedTags/FeedTags";
import { LeftContainer, SearchContainer } from "../Explore/ExploreElements";
import SearchInputBox from "../Common/SearchInputBox";
import { filterByTags } from "../Common/Tags/filterByTags";
import { getFollowData, reset } from "../../features/follow/followSlice";

const Feeds = () => {
    const dispatch = useDispatch();
    const { isApiLoading, isApiWorking } = apiStatus();
    const { feeds, isFeedLoading, isFeedError, feedMessage } = useSelector((state) => state.feeds);
    const { userDetails, isUserDetailLoading, isUserDetailError, userDetailMessage } = useSelector(
        (state) => state.userDetail,
    );
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isFeedError) console.log(feedMessage);
        if (isUserDetailError) console.log(userDetailMessage);

        dispatch(getAllFeeds());
        dispatch(getAllUserDetails());
        user && dispatch(getFollowData(user._id));
        return () => {
            dispatch(feedReset());
            dispatch(userDetailReset());
            dispatch(reset());
        };
    }, [dispatch]);
    const [showOnlyFollowingposts, setShowOnlyFollowingPosts] = useState(false);

    const renderFollowingFilterButtons = () => (
        <>
            <FilterButton
                style={{
                    background: showOnlyFollowingposts === false ? "#FF6B08" : "",
                    color: showOnlyFollowingposts === false ? "#0A0A0A" : "",
                }}
                onClick={() => setShowOnlyFollowingPosts(false)}
            >
                All
            </FilterButton>
            <FilterButton
                style={{
                    background: showOnlyFollowingposts === true ? "#FF6B08" : "",
                    color: showOnlyFollowingposts === true ? "#0A0A0A" : "",
                }}
                onClick={() => setShowOnlyFollowingPosts(true)}
            >
                Following
            </FilterButton>
        </>
    );

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterByTags = (tag) => {
        filterByTags(tag, searchTerm, setSearchTerm);
    };

    const feedTags = feeds?.map((feed) => feed && feed?.tags).flat() || [];

    const combinedData = feeds?.map((feed) => {
        const userDetail = userDetails?.find((user) => user?.user === feed?.user);

        const { username, avatar, verified } = userDetail || {};

        return { ...feed, username, avatar, verified };
    });

    if (isApiLoading || isUserDetailLoading || isFeedLoading) return <LoadingSpinner />;

    if (!isApiWorking) return <UnderMaintenance />;

    return (
        <Wrapper style={{ marginTop: "80px" }}>
            <FeedsContainer>
                <MiddleSection>
                    <AddFeed showPostTags={true} userDetails={userDetails} />
                    <FeedPosts
                        searchTerm={searchTerm}
                        feeds={combinedData}
                        isFeedLoading={isFeedLoading}
                        showOnlyFollowingposts={showOnlyFollowingposts}
                    />
                </MiddleSection>
                <LeftContainer style={{ padding: "25px 0" }}>
                    <SearchContainer>
                        {user && <FilterContainer>{renderFollowingFilterButtons()}</FilterContainer>}
                        <SearchInputBox
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                            setValue={setSearchTerm}
                        />
                    </SearchContainer>
                    <FeedTags tags={feedTags} handleClick={handleFilterByTags} />
                </LeftContainer>
            </FeedsContainer>
        </Wrapper>
    );
};

export default Feeds;
