import React from "react";
import { SearchContainer } from "src/components/Explore/ExploreElements";
import { FilterButton, FilterContainer } from "src/components/Feeds/FeedsElements";
import SearchInputBox from "src/components/Common/SearchInputBox";
import SocialTags from "src/components/Feeds/FeedTags/SocialTags";
import { SidebarContainer } from "./SidebarElements";
import { RouterLink } from "src/components/Tools/ToolsElements";
import { encodeURL } from "src/components/Blogs/util";
import { RouterNavCreateButtonLink } from "src/components/Header/Navbar/NavbarElements";

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
    data,
    selectedTags,
    setSelectedTags,
}) => {
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
        <SidebarContainer sidebarType={sidebarType}>
            {sidebarType === "blogs" && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
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

            <SocialTags
                tags={tags}
                searchTerm={searchTerm}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
            />

            {(sidebarType === "blogs" || sidebarType === "feeds") && data && data.length > 0 && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        marginTop: "20px",
                    }}
                >
                    <FilterContainer>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <FilterButton
                                style={{
                                    background: showOnlyFollowing === false ? "#313131" : "",
                                    color: showOnlyFollowing === false ? "#FF6B08" : "",
                                }}
                                onClick={() => setShowOnlyFollowing(false)}
                            >
                                {sidebarType === "blogs" && "Trending Blogs"}
                                {sidebarType === "feeds" && "Trending Feeds"}
                            </FilterButton>
                        </div>
                    </FilterContainer>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            padding: "15px",
                            flexDirection: "column",
                            borderRadius: "5px",
                            marginTop: "5px",
                            backgroundColor: "#131313",
                        }}
                    >
                        {data.slice(0, 4).map((item, index) => (
                            <RouterLink to={`/${sidebarType}/${encodeURL(item.title || item?._id)}`} key={index}>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "5px",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        backgroundColor: "#1a1a1a",
                                        cursor: "pointer",
                                        border: "1px solid #1a1a1a",
                                        scrollBehavior: "smooth",
                                        height: "auto",
                                        maxHeight: "500px",
                                        overflowY: "auto",
                                        transition: "all 0.3s",
                                    }}
                                >
                                    <h4
                                        style={{
                                            cursor: "pointer",
                                            color: "#bbbbbb",
                                            // listStyle: "inside"
                                        }}
                                    >
                                        {item.title
                                            ? item.title.slice(0, 48)
                                            : item.content.replace(/[^a-zA-Z ]/g, "").slice(0, 48)}
                                    </h4>
                                    <p
                                        style={{
                                            cursor: "pointer",
                                            listStyle: "inside",
                                            fontSize: "12px",
                                            color: "#9b9b9b",
                                            flexWrap: "wrap",
                                            wordWrap: "break-word",
                                        }}
                                    >
                                        {item.title ? item.content.replace(/<[^>]+>/g, "").slice(0, 100) : null}
                                    </p>
                                </div>
                            </RouterLink>
                        ))}
                    </div>
                </div>
            )}
        </SidebarContainer>
    );
};

export default Sidebar;
