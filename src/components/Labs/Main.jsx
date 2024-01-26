import React, { useEffect, useState } from "react";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { LabContainer, LevelContainer, RoomContainer, Search } from "./MainElement";
import RooomCard from "./Room";
import { LevelButton } from "./RoomCardElement";
import { LabData } from "./LabsCardData";

import {
    InterviewQuestionSection,
    InterviewsQuestionsCard,
    InterviewsQuestionsHeading,
    InterviewsQuestionsTitle,
    SingleQuestion,
} from "../Resources/InterviewQuestions/InterviewQuestionsElements";
import { InterviewQuesContainer } from "../Explore/ExploreElements";

export default function Labs() {
    const [levelActive, setLevelActive] = useState("All");
    const Section = ["XSS", "SQLi", "LFI", "RCE"];

    const handleLevelButtonClick = (level) => {
        setLevelActive(level);
    };
    useEffect(() => {}, [levelActive]);

    return (
        <Wrapper>
            <LabContainer>
                <InterviewQuesContainer style={{ width: "310px", marginRight: "20px" }}>
                    <InterviewQuestionSection>
                        <InterviewsQuestionsCard>
                            <InterviewsQuestionsHeading>Category</InterviewsQuestionsHeading>
                            {Section.map((x) => (
                                <InterviewsQuestionsTitle key={x}>
                                    <SingleQuestion> {">"} </SingleQuestion> {x}
                                </InterviewsQuestionsTitle>
                            ))}
                        </InterviewsQuestionsCard>
                    </InterviewQuestionSection>
                </InterviewQuesContainer>

                <RoomContainer>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            height: "42px",
                            marginBottom: "20px",
                        }}
                    >
                        <LevelContainer>
                            <LevelButton
                                style={{ width: "70%", background: levelActive === "All" ? "#FF6B08" : "" }}
                                onClick={() => handleLevelButtonClick("All")}
                            >
                                All
                            </LevelButton>
                            <LevelButton
                                style={{ background: levelActive === "Beginner" ? "#FF6B08" : "" }}
                                onClick={() => handleLevelButtonClick("Beginner")}
                            >
                                Beginner
                            </LevelButton>
                            <LevelButton
                                style={{ background: levelActive === "Intermediate" ? "#FF6B08" : "" }}
                                onClick={() => handleLevelButtonClick("Intermediate")}
                            >
                                Intermediate
                            </LevelButton>
                            <LevelButton
                                style={{ background: levelActive === "Advance" ? "#FF6B08" : "" }}
                                onClick={() => handleLevelButtonClick("Advance")}
                            >
                                Advance
                            </LevelButton>
                        </LevelContainer>
                        <Search placeholder="Search" />
                    </div>
                    <div>
                        {LabData.map((data) => {
                            if (data.Level !== levelActive && levelActive !== "All") {
                                return -1;
                            }
                            return (
                                <RooomCard
                                    key={data.id}
                                    subtitle={data.Subtitle}
                                    title={data.Title}
                                    link={data.id}
                                    tags={data.Tags}
                                    level={data.Level}
                                />
                            );
                        })}
                    </div>
                </RoomContainer>
            </LabContainer>
        </Wrapper>
    );
}
