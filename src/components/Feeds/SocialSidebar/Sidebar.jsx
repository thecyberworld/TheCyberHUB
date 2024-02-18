import React from "react";
import { SearchContainer } from "../../Explore/ExploreElements";
import { FilterButton, FilterContainer } from "../FeedsElements";
import SearchInputBox from "../../Common/SearchInputBox";
import { filterByTags } from "../../Common/Tags/filterByTags";
import SocialTags from "../FeedTags/SocialTags";
import { SidebarContainer } from "./SidebarElements";
import { RouterNavCreateButtonLink } from "../../Header/Navbar/NavbarElements";
const Sidebar = ({
    user,
    searchTerm,
    setSearchTerm,
    handleSearchTermChange,
    tags,
    showOnlyFollowing,
    setShowOnlyFollowing,
    filterLabel,
    userFilters,
    handleTypeFilter,
    exploreFiltersComponent,
    sidebarType,
}) => {
    const handleFilterByTags = (tag) => {
        filterByTags(tag, searchTerm, setSearchTerm);
    };

    const renderFollowingFilterButtons = () => (
        <>
            {sidebarType === "explore" ? (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <FilterButton
                        style={{
                            background: filterLabel === "Connections" ? "#FF6B08" : "",
                            color: filterLabel === "Connections" ? "#0A0A0A" : "",
                        }}
                        onClick={() => handleTypeFilter(userFilters[0])}
                    >
                        Connections
                    </FilterButton>
                    <FilterButton
                        style={{
                            background: filterLabel === "Following" ? "#FF6B08" : "",
                            color: filterLabel === "Following" ? "#0A0A0A" : "",
                        }}
                        onClick={() => handleTypeFilter(userFilters[1])}
                    >
                        Following
                    </FilterButton>
                    <FilterButton
                        style={{
                            background: filterLabel === "Followers" ? "#FF6B08" : "",
                            color: filterLabel === "Followers" ? "#0A0A0A" : "",
                        }}
                        onClick={() => handleTypeFilter(userFilters[2])}
                    >
                        Followers
                    </FilterButton>
                </div>
            ) : (
                <>
                    <FilterButton
                        style={{
                            background: showOnlyFollowing === false ? "#FF6B08" : "",
                            color: showOnlyFollowing === false ? "#0A0A0A" : "",
                        }}
                        onClick={() => setShowOnlyFollowing(false)}
                    >
                        For You
                    </FilterButton>
                    <FilterButton
                        style={{
                            background: showOnlyFollowing === true ? "#FF6B08" : "",
                            color: showOnlyFollowing === true ? "#0A0A0A" : "",
                        }}
                        onClick={() => setShowOnlyFollowing(true)}
                    >
                        Following
                    </FilterButton>
                </>
            )}
        </>
    );

    return (
        <SidebarContainer>
            {sidebarType === "blogs" && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <RouterNavCreateButtonLink to={"/dashboard/blogs/create"}>Create Blog</RouterNavCreateButtonLink>
                    <RouterNavCreateButtonLink to={"/dashboard/blogs"}>View My Blogs</RouterNavCreateButtonLink>
                </div>
            )}

            {/* {sidebarType === "feeds" && <div style={{display: "flex", justifyContent: "space-between"}}> */}
            {/* <RouterNavCreateButtonLink to={"/dashboard/feeds/create"}>Create</RouterNavCreateButtonLink> */}
            {/* <RouterNavCreateButtonLink to={"/dashboard/feeds"}>View My Feeds</RouterNavCreateButtonLink> */}
            {/* </div>} */}

            {user && <FilterContainer>{renderFollowingFilterButtons()}</FilterContainer>}

            <SearchContainer>
                <SearchInputBox
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    setValue={setSearchTerm}
                />
            </SearchContainer>

            {sidebarType === "explore" && exploreFiltersComponent}

            <SocialTags tags={tags} handleClick={handleFilterByTags} />
        </SidebarContainer>
    );
};

export default Sidebar;
