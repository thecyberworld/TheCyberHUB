import React, { useState, useEffect } from "react";
import axios from "axios";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import styled from "styled-components";
import PreviewMarkdown from "../Blogs/ViewBlog/PreviewMarkdown";

const LeftSection = styled.div`
    min-width: 500px;
    max-width: 500px;
    width: 100%;
    flex: 1;
    padding: 20px;
`;

const RightSection = styled.div`
    flex: 1;
    width: 100%;
    padding: 20px;
`;

const MarkdownContentFromGitHub = () => {
    const [contents, setContents] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const apiUrl = "https://api.github.com/repos/thecyberworld/hacklist/contents/";

        const fetchContents = async (url) => {
            try {
                const response = await axios.get(url);
                const filteredContents = response.data.filter(
                    (item) =>
                        (item.type === "dir" && item.name !== "images") ||
                        (item.type === "file" && item.name.endsWith(".md") && item.name !== "README.md"),
                );

                setContents(filteredContents);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchContents(apiUrl);
    }, []);

    const handleFileClick = async (file) => {
        try {
            if (file.type === "file") {
                const response = await axios.get(file.download_url);
                setSelectedFile({ ...file, content: response.data });
            } else if (file.type === "dir") {
                const response = await axios.get(file.url);
                const nestedContents = response.data.filter(
                    (item) =>
                        (item.type === "dir" && item.name !== "images") ||
                        (item.type === "file" && item.name.endsWith(".md") && item.name !== "README.md"),
                );
                setContents(nestedContents);
                setSelectedFile(null);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleItemClick = (item) => {
        handleFileClick(item);
    };

    return (
        <Wrapper>
            <div style={{ display: "flex" }}>
                <LeftSection>
                    <ul>
                        {contents.map((item, id) => (
                            <li key={id} onClick={() => handleItemClick(item)}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </LeftSection>
                <RightSection>
                    {selectedFile && (
                        <div>
                            <h3>{selectedFile.name}</h3>
                            <PreviewMarkdown content={selectedFile.content} />
                        </div>
                    )}
                </RightSection>
            </div>
        </Wrapper>
    );
};

export default MarkdownContentFromGitHub;
