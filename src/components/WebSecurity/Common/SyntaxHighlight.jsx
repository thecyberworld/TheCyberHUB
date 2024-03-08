import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const SyntaxHighlight = ({ code, language }) => {
    return (
        <SyntaxHighlighter
            language={language}
            style={dracula}
            customStyle={{
                // wrap lines
                whiteSpace: "pre-wrap",
                // show line numbers
                overflowX: "auto",
                // wrap words
                wordWrap: "break-word",
                // break long words
                wordBreak: "break-all",
            }}
        >
            {code}
        </SyntaxHighlighter>
    );
};

export default SyntaxHighlight;
