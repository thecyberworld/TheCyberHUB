import React, { useRef } from "react";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import { MethodologyData } from "./MethodlogyData";
import { DataConatiner, HideDataContainer, MainTitleContainer, MethodologyHeading } from "./MethodologyElement";

const Methodology = () => {
    const subtopicRefs = useRef({});

    function handleClick(subtopic) {
        const element = subtopicRefs.current[subtopic];
        if (element.style.display === "block") {
            element.style.display = "none";
        } else {
            element.style.display = "block";
        }
    }

    return (
        <Wrapper>
            <div></div>
            <div>
                {Object.keys(MethodologyData).map((mainTitle) => (
                    <MainTitleContainer key={mainTitle}>
                        <h1
                            style={{
                                fontSize: "42px",
                            }}
                        >
                            {mainTitle}
                        </h1>
                        <p
                            style={{
                                display: "block",
                                textAlign: "center",
                            }}
                        >
                            {MethodologyData[mainTitle].Description}
                        </p>

                        {Object.keys(MethodologyData[mainTitle].Topics).map((topic) => (
                            <div key={topic} style={{ width: "100%", margin: "20px" }}>
                                <h2 style={{ textAlign: "center", fontSize: "25px" }}>{topic}</h2>
                                {Object.keys(MethodologyData[mainTitle].Topics[topic]).map((subTopic) => (
                                    <DataConatiner key={subTopic} style={{ width: "100%" }}>
                                        <MethodologyHeading onClick={() => handleClick(subTopic)}>
                                            {subTopic}
                                        </MethodologyHeading>
                                        <HideDataContainer
                                            ref={(el) => (subtopicRefs.current[subTopic] = el)}
                                            id={subTopic}
                                        >
                                            <p>
                                                {" "}
                                                <span style={{ fontWeight: "bold" }}>Summary </span>-
                                                {MethodologyData[mainTitle].Topics[topic][subTopic].Summary}
                                            </p>
                                            <h1 style={{ marginTop: "5px" }}>Goals:</h1>
                                            <ul style={{ listStyle: "circle", marginLeft: "30px" }}>
                                                {MethodologyData[mainTitle].Topics[topic][subTopic].Goals.map(
                                                    (goal) => (
                                                        <li key={goal}>{goal}</li>
                                                    ),
                                                )}
                                            </ul>
                                        </HideDataContainer>
                                    </DataConatiner>
                                ))}
                            </div>
                        ))}
                    </MainTitleContainer>
                ))}
            </div>
        </Wrapper>
    );
};

export default Methodology;
