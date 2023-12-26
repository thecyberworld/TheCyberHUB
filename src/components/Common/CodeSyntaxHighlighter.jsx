import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/src/styles/hljs";

const CodeSyntaxHighlighter = ({ code }) => {
    console.log(code);

    return (
        <SyntaxHighlighter
            language="javascript"
            style={a11yDark}
            customStyle={{
                margin: "20px 0 20px",
                borderRadius: "10px",
                padding: "20px",
                fontFamily: "'Fira Code', monospace",
                fontSize: "16px",
                lineHeight: "1.5",
                overflowX: "scroll",
                overflowY: "hidden",
                maxHeight: "600px",
                maxWidth: "100%",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
            }}
        >
            {code}
        </SyntaxHighlighter>
    );
};

export default CodeSyntaxHighlighter;
