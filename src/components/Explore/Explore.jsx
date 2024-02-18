import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ExploreContainer, LeftContainer, RightContainer } from "./ExploreElements";

import { useDispatch, useSelector } from "react-redux";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { getAllCTFs } from "../../features/ctf/ctfSlice";
import { blogReset, getAllBlogs } from "../../features/blogs/blogSlice";
import { getAllUserDetails, userDetailReset } from "../../features/userDetail/userDetailSlice";
import { feedReset, getAllFeeds } from "../../features/feeds/feedsSlice";
import Users from "./Users/Users";
import FeedsExplore from "./FeedsExplore";
import BlogCards from "../Blogs/BlogCard/BlogCards";
import CtfChallenges from "../CaptureTheFlag/CTFCards/CtfChallenges";
import apiStatus from "../../features/apiStatus";
import UnderMaintenance from "../Other/UnderMaintenance/UnderMaintenance";
import LoadingSpinner from "../Other/MixComponents/Spinner/LoadingSpinner";
import { getFollowData } from "../../features/follow/followSlice";
import { getConnections } from "../../features/connections/connectionSlice";
import Sidebar from "../Feeds/SocialSidebar/Sidebar";
import { FilterButton } from "../Feeds/FeedsElements";
import { HintIcon } from "../WebSecurity/Common/HintElements";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const FilterContainer = styled.div``;

const FilterHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 8px 12px;
    background-color: #131313;
    border-radius: 5px;
`;

const FilterTitle = styled.p`
    margin: 0;
    font-weight: bold;
`;

const FilterContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    padding: 10px 0;
`;
const FilterSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <FilterContainer>
            <FilterHeader onClick={() => setIsOpen(!isOpen)}>
                <FilterTitle>{title}</FilterTitle>
                <HintIcon>{!isOpen ? <FaAngleDown /> : <FaAngleUp />}</HintIcon>
            </FilterHeader>
            {isOpen && <FilterContent>{children}</FilterContent>}
        </FilterContainer>
    );
};

const FiltersComponent = ({ types, selectedType, handleTypeSelect }) => {
    return (
        <FilterSection title="Filters">
            {types.map((filter, index) => (
                <FilterButton
                    key={index}
                    style={{
                        background: selectedType === filter.value ? "#FF6B08" : "#1a1a1a",
                        color: selectedType === filter.value ? "#0A0A0A" : "",
                        borderRadius: "5px",
                    }}
                    onClick={() => handleTypeSelect(filter.value)}
                >
                    {filter.label}
                </FilterButton>
            ))}
        </FilterSection>
    );
};

const Explore = () => {
    const dispatch = useDispatch();

    const [showOnlyFollowing, setShowOnlyFollowing] = useState(false);

    const { user } = useSelector((state) => state.auth);
    const { isApiLoading, isApiWorking } = apiStatus();
    const { isUserDetailLoading } = useSelector((state) => state.userDetail);
    const { feeds, isFeedLoading } = useSelector((state) => state.feeds);
    const { blogs, isBlogLoading } = useSelector((state) => state.blogs);
    const { ctf, isCtfLoading } = useSelector((state) => state.ctf);
    const { connections } = useSelector((state) => state.connectionData);
    const [userDetailsLocal, setUserDetailsLocal] = useState([]);
    const followUserId = user?._id;
    const { followData } = useSelector((state) => state.followData);
    const followers = followData?.followers;
    const following = followData?.following;
    const allConnections = connections?.connections?.map((connection) => connection.user);

    const [filterLabel, setFilterLabel] = useState("Connections");
    const [selectedFilter, setSelectedFilter] = useState("all");

    useEffect(() => {
        dispatch(getAllUserDetails()).then(({ payload }) => {
            setSelectedFilter(payload.map((user) => user.user));
            setUserDetailsLocal(payload);
        });
        dispatch(getAllFeeds());
        dispatch(getAllBlogs());
        dispatch(getAllCTFs());
        if (followUserId) {
            dispatch(getFollowData(followUserId));
            dispatch(getConnections(followUserId));
        }

        return () => {
            dispatch(blogReset());
            dispatch(userDetailReset());
            dispatch(feedReset());
        };
    }, [dispatch]);

    useEffect(() => {
        setSelectedFilter(allConnections);
    }, [connections]);

    const blogTags = blogs?.map((blog) => blog && blog?.tags).flat() || [];
    const ctfTags = ctf?.map((ctf) => ctf && ctf?.tags).flat() || [];
    const feedTags = feeds?.map((feed) => feed && feed?.tags).flat() || [];
    // const forumTags = forums.map((forum) => forum && forum.tags).flat() || [];

    const tags = [...new Set([...feedTags, ...blogTags, ...ctfTags])].sort();

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const [selectedType, setSelectedType] = useState("all");
    const types = [
        { value: "all", label: "ALL" },
        { value: "users", label: "Users" },
        { value: "blogs", label: "Blogs" },
        { value: "ctf", label: "CTF" },
        { value: "feeds", label: "Feeds" },
    ];

    const handleTypeSelect = (type) => {
        setSelectedType(type);
    };

    const feedData = feeds
        ?.slice()
        .reverse()
        ?.slice(0, 10)
        .reverse()
        .map((feed) => {
            const userDetail = userDetailsLocal?.find((user) => user.user === feed.user);
            if (!selectedFilter?.includes(userDetail?.user)) {
                return null;
            }
            const { username, avatar, verified } = userDetail || {};

            return { ...feed, username, avatar, verified };
        });

    const filteredFeeds = feedData?.filter((feed) => feed !== null);

    const blogsData = blogs
        ?.slice()
        .reverse()
        ?.slice(0, 10)
        .reverse()
        .map((blog) => {
            const userDetail = userDetailsLocal?.find((user) => user.user === blog.user);
            if (!selectedFilter?.includes(userDetail?.user)) {
                return null;
            }
            const { username, avatar, verified } = userDetail || {};

            return { ...blog, username, avatar, verified };
        });

    const filteredBlogs = blogsData?.filter((blog) => blog !== null);

    const filteredCtf = ctf
        ?.slice()
        .reverse()
        ?.slice(0, 10)
        .reverse()
        .filter((ctf) => ctf.registeredUsers.find(({ user }) => selectedFilter.includes(user)));

    const filteredUsers = userDetailsLocal.filter((user) => selectedFilter?.includes(user.user));

    const handleTypeFilter = (filter) => {
        setSelectedFilter(filter.value);
        setFilterLabel(filter.label);
    };

    const userFilters = [
        { value: allConnections, label: "Connections" },
        { value: following, label: "Following" },
        { value: followers, label: "Followers" },
    ];

    if (isApiLoading) return <LoadingSpinner />;

    if (!isApiWorking) return <UnderMaintenance />;

    return (
        <Wrapper>
            <ExploreContainer>
                <LeftContainer>
                    <Sidebar
                        user={user}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearchTermChange={handleSearchTermChange}
                        tags={tags}
                        showOnlyFollowing={showOnlyFollowing}
                        setShowOnlyFollowing={setShowOnlyFollowing}
                        userFilters={userFilters}
                        filterLabel={filterLabel}
                        handleTypeFilter={handleTypeFilter}
                        exploreFiltersComponent={FiltersComponent({
                            types,
                            selectedType,
                            handleTypeSelect,
                        })}
                        sidebarType={"explore"}
                    />
                </LeftContainer>

                <RightContainer>
                    {selectedType === "all" || selectedType === "users" ? (
                        <Users
                            userDetails={filteredUsers}
                            isUserDetailLoading={isUserDetailLoading}
                            searchTerm={searchTerm}
                            displayAt={"explore"}
                        />
                    ) : null}

                    {selectedType === "all" || selectedType === "feeds" ? (
                        <FeedsExplore
                            feeds={filteredFeeds}
                            isFeedLoading={isFeedLoading}
                            searchTerm={searchTerm}
                            displayAt={"explore"}
                        />
                    ) : null}

                    {selectedType === "all" || selectedType === "blogs" ? (
                        <BlogCards
                            blogs={filteredBlogs}
                            isBlogLoading={isBlogLoading}
                            searchTerm={searchTerm}
                            displayAt={"explore"}
                        />
                    ) : null}

                    {/* {selectedType === "all" || selectedType === "forum" ? ( */}
                    {/*    <ForumPosts forums={forums} searchTerm={searchTerm} displayAt={"explore"}/> */}
                    {/* ) : null} */}

                    {selectedType === "all" || selectedType === "ctf" ? (
                        <CtfChallenges
                            ctf={filteredCtf}
                            isCtfLoading={isCtfLoading}
                            searchTerm={searchTerm}
                            displayAt={"explore"}
                        />
                    ) : null}
                </RightContainer>
            </ExploreContainer>
        </Wrapper>
    );
};

export default Explore;
