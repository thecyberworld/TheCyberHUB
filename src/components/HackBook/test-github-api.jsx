import React, { useState, useEffect } from "react";
import axios from "axios";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";

const MarkdownContentFromGitHub = ({ owner, repo, path }) => {
    const [markdownContent, setMarkdownContent] = useState("");

    useEffect(() => {
        const url = `https://api.github.com/users/thecyberworld/repos/thecyberhub`;
        axios
            .get(url)
            .then((response) => response.data)
            .then((data) => {
                if (data.type === "file") {
                    fetch(data.download_url)
                        .then((response) => response.text())
                        .then((text) => setMarkdownContent(text));
                }
            });
    }, [owner, repo, path]);

    return (
        <Wrapper>
            {markdownContent ? <div dangerouslySetInnerHTML={{ __html: markdownContent }} /> : <p>Loading...</p>}
        </Wrapper>
    );
};

export default MarkdownContentFromGitHub;
