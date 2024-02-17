import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const SyntaxHighlight = ({ code, language }) => {
    return (
        <SyntaxHighlighter language={language} style={dracula}>
            {code}
        </SyntaxHighlighter>
    );
};

export default SyntaxHighlight;
