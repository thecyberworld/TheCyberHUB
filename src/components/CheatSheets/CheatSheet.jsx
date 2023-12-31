import React, { useState } from "react";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import {
    LeftSection,
    ContentData,
    ContentNav,
    ContentNavData,
    HackBookContainer,
    HackBookHeading,
    HackBookTitle,
    RoadmapDetails,
    RoadmapDetailsCard,
    MarkdownPreview,
    MarkdownContainer,
    ToggleButton,
} from "./CheatSheetElements";

import { LuPanelRightOpen } from "react-icons/lu";

const CheatSheet = ({ data, heading }) => {
    const hackBookData = data;
    const [selectedFile, setSelectedFile] = useState(() => {
        const firstTitle = Object.keys(hackBookData)[0];
        const firstFile = hackBookData[firstTitle] && hackBookData[firstTitle][0];
        if (firstFile && Object.keys(firstFile)[0].endsWith(".md")) {
            return {
                name: Object.keys(firstFile)[0],
                content: firstFile[Object.keys(firstFile)[0]],
            };
        }
        return null;
    });

    const [toggle, setToggle] = useState(true);

    const handleToggle = () => {
        setToggle(!toggle);
    };

    const handleFileClick = (title, fileName) => {
        const fileContent = hackBookData[title].find((file) => Object.keys(file)[0] === fileName);
        setSelectedFile({
            name: fileName,
            content: fileContent[fileName],
        });
    };

    return (
        <Wrapper>
            <HackBookContainer>
                {toggle && (
                    <LeftSection>
                        <ContentNav>
                            <HackBookTitle> {heading} </HackBookTitle>
                            <ContentNavData>
                                {Object.keys(hackBookData).map(
                                    (title, id) =>
                                        hackBookData[title].length > 0 && (
                                            <RoadmapDetails key={id}>
                                                <HackBookHeading>
                                                    {title.replace(/[^a-zA-Z0-9]+/g, " ")}
                                                </HackBookHeading>
                                                {hackBookData[title].map(
                                                    (file, fileId) =>
                                                        Object.keys(file)[0].endsWith(".md") && (
                                                            <RoadmapDetailsCard
                                                                key={fileId}
                                                                isSelected={
                                                                    selectedFile &&
                                                                    selectedFile.name === Object.keys(file)[0]
                                                                }
                                                                onClick={() =>
                                                                    handleFileClick(title, Object.keys(file)[0])
                                                                }
                                                            >
                                                                {
                                                                    Object.keys(file)[0]
                                                                        .replace(/.md/g, "")
                                                                        .replace(/[^a-zA-Z0-9]+/g, " ")
                                                                    // .toLowerCase()
                                                                }
                                                            </RoadmapDetailsCard>
                                                        ),
                                                )}
                                            </RoadmapDetails>
                                        ),
                                )}
                            </ContentNavData>
                        </ContentNav>
                    </LeftSection>
                )}

                <ContentData>
                    <ToggleButton onClick={handleToggle} size={20}>
                        <LuPanelRightOpen />
                    </ToggleButton>
                    {selectedFile && (
                        <MarkdownContainer>
                            <MarkdownPreview
                                source={selectedFile.content || ""}
                                style={{
                                    color: "#f5f5f5",
                                    backgroundColor: "#0a0a0a",
                                    padding: "20px",
                                    width: "100%",
                                    fontSize: "18px",
                                }}
                            />
                        </MarkdownContainer>
                    )}
                </ContentData>
            </HackBookContainer>
        </Wrapper>
    );
};

export default CheatSheet;
