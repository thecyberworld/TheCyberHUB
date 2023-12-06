import React, { useState, useEffect } from "react";
import axios from "axios";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import styled from "styled-components";
import PreviewMarkdown from "../Blogs/ViewBlog/PreviewMarkdown";
import {
    ContentData,
    ContentNav,
    ContentNavData,
    HackBookContainer,
    HackBookHeading,
    HackBookTitle,
    LI,
    UL,
} from "./HackBookElements";
import { RoadmapDetails, RoadmapDetailsCard } from "../Learn/Roadmaps/RoadmapElements";

const LeftSection = styled.div`
    min-width: 500px;
    width: 100%;
    flex: 1;
`;

const HackBook = () => {
    const [hackBookData, setHackBookData] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const apiUrl = "https://api.github.com/repos/KathanP19/HowToHunt/contents/";

        const fetchContents = async (url) => {
            try {
                const response = await axios.get(url);
                const filteredContents = response.data.filter(
                    (item) =>
                        (item.type === "dir" && item.name !== "images") ||
                        (item.type === "file" && item.name.endsWith(".md") && item.name !== "README.md"),
                );

                for (const item of filteredContents) {
                    if (item.type === "dir") {
                        const nestedData = {};
                        const nestedResponse = await axios.get(item.url);
                        const nestedContents = nestedResponse.data.filter(
                            (nestedItem) =>
                                nestedItem.type === "file" &&
                                nestedItem.name.endsWith(".md") &&
                                nestedItem.name !== "README.md",
                        );
                        for (const nestedItem of nestedContents) {
                            const fileResponse = await axios.get(nestedItem.download_url);
                            nestedData[nestedItem.name] = fileResponse.data;
                        }
                        setHackBookData((prevData) => ({ ...prevData, [item.name]: nestedData }));
                    }
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchContents(apiUrl);
    }, []);

    const handleFileClick = (dirName, fileName) => {
        setSelectedFile({
            name: fileName,
            content: hackBookData[dirName][fileName],
        });
    };

    return (
        <Wrapper>
            <HackBookContainer>
                <LeftSection>
                    <ContentNav>
                        <HackBookTitle> HackBook </HackBookTitle>
                        <ContentNavData>
                            {Object.keys(hackBookData).map((dirName, id) => (
                                <RoadmapDetails key={id}>
                                    <HackBookHeading> {dirName} </HackBookHeading>
                                    <UL>
                                        {Object.keys(hackBookData[dirName]).map((fileName, fileId) => (
                                            <RoadmapDetailsCard
                                                key={fileId}
                                                onClick={() => handleFileClick(dirName, fileName)}
                                            >
                                                <LI>{fileName}</LI>
                                            </RoadmapDetailsCard>
                                        ))}
                                    </UL>
                                </RoadmapDetails>
                            ))}
                        </ContentNavData>
                    </ContentNav>
                </LeftSection>
                <ContentData>
                    {selectedFile && (
                        <div>
                            <h3>{selectedFile.name}</h3>
                            <PreviewMarkdown content={selectedFile.content} />
                        </div>
                    )}
                </ContentData>
            </HackBookContainer>
        </Wrapper>
    );
};

export default HackBook;
