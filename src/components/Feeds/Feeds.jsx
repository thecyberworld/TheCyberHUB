import React, { useState, useEffect } from "react";
import { FeedsContainer, MiddleSection } from "./FeedsElements";
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

const Feeds = () => {
    const dispatch = useDispatch();
    const { isApiLoading, isApiWorking } = apiStatus();
    const { feeds, isFeedLoading, isFeedError, feedMessage } = useSelector((state) => state.feeds);
    const { userDetails, isUserDetailLoading, isUserDetailError, userDetailMessage } = useSelector(
        (state) => state.userDetail,
    );

    useEffect(() => {
        if (isFeedError) console.log(feedMessage);
        if (isUserDetailError) console.log(userDetailMessage);

        dispatch(getAllFeeds());
        dispatch(getAllUserDetails());

        return () => {
            dispatch(feedReset());
            dispatch(userDetailReset());
        };
    }, [dispatch]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };
    //
    const filterByTag = (tag) => {
        const currentSearchTerm = searchTerm;
        if (currentSearchTerm === tag) {
            setSearchTerm(""); // If the clicked tag is already the current search term, removes it.
        } else {
            setSearchTerm(tag); // If the clicked tag is not the current search term, sets it.
        }
    };

    /**
 * Handles the onClick event for tags, enabling the addition or removal of tags in the SearchTerm.
 * Tags are crucial for content filtering, and this function allows the manipulation of multiple tags.
 * However, be aware that the current implementation may encounter issues with tags containing spaces.
 * It is recommended to avoid spaces in tag names to ensure proper functionality.
 

const filterByTag = (tag) => {
    const updatedSearchTerm = searchTerm ? searchTerm.split(" ") : [];
    const index = updatedSearchTerm.indexOf(tag);
    if (index !== -1) {
        updatedSearchTerm.splice(index, 1);
    } else {
        updatedSearchTerm.push(tag);
    }
    setSearchTerm(updatedSearchTerm.join(" "));
};
*/
    //
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
                    <FeedPosts searchTerm={searchTerm} feeds={combinedData} isFeedLoading={isFeedLoading} />
                </MiddleSection>
                <LeftContainer style={{ padding: "25px 0" }}>
                    <SearchContainer>
                        <SearchInputBox
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                        />
                    </SearchContainer>
                    <FeedTags tags={feedTags} handleClick={filterByTag} />
                </LeftContainer>
            </FeedsContainer>
        </Wrapper>
    );
};

export default Feeds;
