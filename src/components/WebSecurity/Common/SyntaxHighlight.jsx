import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";

const SyntaxHighlight = ({ code, language }) => {
    return (
        <SyntaxHighlighterPreview
            language={language}
            style={dracula}
            customStyle={{
                whiteSpace: "pre-wrap",
                overflowX: "auto",
                wordWrap: "break-word",
                wordBreak: "break-all",
            }}
        >
            {code}
        </SyntaxHighlighterPreview>
    );
};

const SyntaxHighlighterPreview = styled(SyntaxHighlighter)`
    * {
        white-space: pre-wrap;
        overflow-x: auto;
        word-wrap: break-word;
        word-break: break-all;
        max-width: 100%;
    }
`;

export default SyntaxHighlight;
