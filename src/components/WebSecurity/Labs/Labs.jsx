import React, { useState } from "react";
import { LabContainer, LevelContainer, RoomContainer, Search } from "./LabsElement";
import RoomCard from "./RoomCard";
import { LevelButton } from "./RoomCardElement";
import { LabData } from "./LabsData";

import {
    InterviewQuestionSection,
    InterviewsQuestionsCard,
    InterviewsQuestionsHeading,
    InterviewsQuestionsTitle,
    SingleQuestion,
} from "../../Resources/InterviewQuestions/InterviewQuestionsElements";
import { InterviewQuesContainer } from "../../Explore/ExploreElements";

export default function Labs() {
    const [levelActive, setLevelActive] = useState("All");
    const [categoryActive, setCategoryActive] = useState("All");
    const [searchInput, setSearchInput] = useState("");

    const handleLevelButtonClick = (level) => {
        setLevelActive(level);
    };

    const handleCategoryClick = (category) => {
        setCategoryActive(category);
    };

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const renderLevelButtons = (levels) => {
        return levels.map((level) => (
            <LevelButton
                key={level}
                style={{
                    background: levelActive === level ? "#FF6B08" : "",
                    color: levelActive === level ? "#0A0A0A" : "",
                }}
                onClick={() => handleLevelButtonClick(level)}
            >
                {level}
            </LevelButton>
        ));
    };

    const levels = ["All", "Beginner", "Intermediate", "Advance"];

    // Unique categories
    const categories = Array.from(new Set(LabData.map((data) => data.category)));

    // Filtered LabData based on search input
    const filteredLabData = LabData.filter(
        (data) =>
            (data.level === levelActive || levelActive === "All") &&
            (data.category === categoryActive || categoryActive === "All") &&
            (data.title.toLowerCase().includes(searchInput.toLowerCase()) ||
                data.description.toLowerCase().includes(searchInput.toLowerCase()) ||
                data.level.toLowerCase().includes(searchInput.toLowerCase()) ||
                data.tags.some((tag) => tag.toLowerCase().includes(searchInput.toLowerCase()))),
    );

    return (
        <>
            {" "}
            <div
                style={{
                    width: "100%",
                    maxWidth: "1200px",
                    margin: "20px auto",
                }}
            >
                <LabContainer>
                    <InterviewQuesContainer
                        className="categories-container"
                        style={{
                            padding: "0",
                        }}
                    >
                        <InterviewQuestionSection>
                            <InterviewsQuestionsCard>
                                <InterviewsQuestionsHeading
                                    style={{
                                        fontSize: "20px",
                                        marginBottom: "10px",
                                        textAlign: "center",
                                        alignItems: "center",
                                        display: "flex",
                                    }}
                                >
                                    {" "}
                                    Labs{" "}
                                </InterviewsQuestionsHeading>
                                {categories.map((cat) => (
                                    <InterviewsQuestionsTitle
                                        key={cat}
                                        onClick={() => handleCategoryClick(cat)}
                                        className={`category-item ${cat === categoryActive ? "active" : ""}`}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            fontSize: "18px",
                                        }}
                                    >
                                        <SingleQuestion> {">"} </SingleQuestion> {cat}
                                    </InterviewsQuestionsTitle>
                                ))}
                            </InterviewsQuestionsCard>
                        </InterviewQuestionSection>
                    </InterviewQuesContainer>

                    <RoomContainer>
                        <div className="header">
                            <LevelContainer>{renderLevelButtons(levels)}</LevelContainer>
                            <Search placeholder="Search" value={searchInput} onChange={handleSearchInputChange} />
                        </div>

                        <div className="room-cards-container">
                            {filteredLabData.map((data) => (
                                <RoomCard
                                    key={data.id}
                                    title={data.title}
                                    subtitle={data.description}
                                    solution={data.solution}
                                    category={data.category}
                                    link={data.id}
                                    tags={data.tags}
                                    level={data.level}
                                />
                            ))}
                        </div>
                    </RoomContainer>
                </LabContainer>
            </div>
        </>
    );
}
