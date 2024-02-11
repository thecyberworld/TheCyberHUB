import React, { useEffect, useState } from "react";

import {
    ExploreContainer,
    LeftContainer,
    RightContainer,
    SearchContainer,
    SearchTypeButton,
    SearchTypeContainer,
} from "./ExploreElements";

import { useDispatch, useSelector } from "react-redux";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { getAllCTFs } from "../../features/ctf/ctfSlice";
import { blogReset, getAllBlogs } from "../../features/blogs/blogSlice";
import { getAllUserDetails, userDetailReset } from "../../features/userDetail/userDetailSlice";
import { feedReset, getAllFeeds } from "../../features/feeds/feedsSlice";
import Users from "./Users/Users";
import FeedsExplore from "./FeedsExplore";
import Tags from "./Tags/Tags";
import BlogCards from "../Blogs/BlogCard/BlogCards";
import CtfChallenges from "../CaptureTheFlag/CTFCards/CtfChallenges";
import apiStatus from "../../features/apiStatus";
import UnderMaintenance from "../Other/UnderMaintenance/UnderMaintenance";
import LoadingSpinner from "../Other/MixComponents/Spinner/LoadingSpinner";
import SearchInputBox from "../Common/SearchInputBox";
import { getFollowData } from "../../features/follow/followSlice";
import { getConnections } from "../../features/connections/connectionSlice";

const Explore = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { isApiLoading, isApiWorking } = apiStatus();
    const { isUserDetailLoading } = useSelector((state) => state.userDetail);
    const { feeds, isFeedLoading } = useSelector((state) => state.feeds);
    const { blogs, isBlogLoading } = useSelector((state) => state.blogs);
    const { ctf, isCtfLoading } = useSelector((state) => state.ctf);
    // const {forums} = useSelector((state) => state.forums);
    const { connections } = useSelector((state) => state.connectionData);
    const [userDetailsLocal, setUserDetailsLocal] = useState([]);
    const followUserId = user?._id;
    const { followData } = useSelector((state) => state.followData);
    const allUsers = userDetailsLocal.map((user) => user.user);
    const followers = followData?.followers;
    const following = followData?.following;
    const allConnections = connections?.connections?.map((connection) => connection.user);

    const [filterLabel, setFilterLabel] = useState("ALL");
    const [selectedFilter, setSelectedFilter] = useState(allUsers);

    useEffect(() => {
        dispatch(getAllUserDetails()).then(({ payload }) => {
            setSelectedFilter(payload.map((user) => user.user));
            setUserDetailsLocal(payload);
        });
        dispatch(getAllFeeds());
        dispatch(getAllBlogs());
        // dispatch(getForums());
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

    const blogTags = blogs?.map((blog) => blog && blog?.tags).flat() || [];
    const ctfTags = ctf?.map((ctf) => ctf && ctf?.tags).flat() || [];
    const feedTags = feeds?.map((feed) => feed && feed?.tags).flat() || [];
    // const forumTags = forums.map((forum) => forum && forum.tags).flat() || [];

    const tags = [
        ...new Set([
            ...feedTags,
            ...blogTags,
            ...ctfTags,
            // ...forumTags,
        ]),
    ].sort();

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
        // {value: "forum", label: "Forum"},
        // jobs, internships, courses, events, quiz, interviewQues, tools
        // {value: 'jobs', label: 'Jobs'},
        // {value: 'internships', label: 'Internships'},
        // {value: 'courses', label: 'Courses'},
        // {value: 'events', label: 'Events'},
        // {value: 'quiz', label: 'Quiz'},
        // {value: 'interviewQues', label: 'Interview Questions'},
        // {value: 'tools', label: 'Tools'},
    ];

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        // You can perform any additional actions here based on the selected type
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

    const ctfData = ctf
        ?.slice()
        .reverse()
        ?.slice(0, 10)
        .reverse()
        .map((ctf) => {
            const registeredUser = ctf.registeredUsers.find(({ user }) => selectedFilter.includes(user));
            return registeredUser ? { ...ctf } : null;
        });

    const filteredCtf = ctfData?.filter((ctf) => ctf !== null);

    const filteredUsers = userDetailsLocal.map((user) => {
        if (!selectedFilter?.includes(user.user)) {
            return null;
        }
        return user;
    });

    const handleTypeFilter = (filter) => {
        setSelectedFilter(filter.value);
        setFilterLabel(filter.label);
    };

    const filters = [
        { value: allUsers, label: "ALL" },
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
                    <SearchContainer>
                        <SearchInputBox
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                        />
                        <SearchTypeContainer>
                            {types.map((type) => (
                                <SearchTypeButton
                                    key={type.value}
                                    selected={selectedType === type.value}
                                    onClick={() => handleTypeSelect(type.value)}
                                >
                                    {type.label}
                                </SearchTypeButton>
                            ))}
                        </SearchTypeContainer>
                        {user && (
                            <>
                                <p className="text-xl ">Filter</p>
                                <div className="flex flex-wrap gap-2.5 p-1 w-full">
                                    {filters.map((filter) => (
                                        <SearchTypeButton
                                            key={filter.label}
                                            selected={filterLabel === filter.label}
                                            onClick={() => {
                                                handleTypeFilter(filter);
                                            }}
                                        >
                                            {filter.label}
                                        </SearchTypeButton>
                                    ))}
                                </div>
                            </>
                        )}
                    </SearchContainer>

                    <Tags tags={tags} />
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
