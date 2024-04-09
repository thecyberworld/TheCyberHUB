import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

const PreviewMarkdown = (props) => {
    return (
        <ContentReactMarkdown
            components={{
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                        <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div" {...props}>
                            {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                },
            }}
        >
            {props.content !== "" ? props.content : "PLease add Some Content"}
        </ContentReactMarkdown>
    );
};

const ContentReactMarkdown = styled(ReactMarkdown)`
    text-align: start;
    padding: 0 0;
    word-wrap: break-word;

    * {
        //font-family: "Poppins", sans-serif;
        margin: 10px auto;
        white-space: pre-wrap;
        word-break: break-word;
        overflow-wrap: break-word;
    }


    code {
        font-family: "Roboto Mono", monospace;
        background-color: #1d1f21;
        border-radius: 5px;
        padding: 5px 10px;
        max-width: 100%;
        white-space: pre-wrap;
        word-break: break-word;
        overflow-wrap: break-word;
    }

    pre {
        font-family: "Roboto Mono", monospace;
        background-color: #1d1f21;
        border-radius: 5px;
        padding: 5px 10px;
        max-width: 100%;
        white-space: pre-wrap;
        word-break: break-word;
        overflow-wrap: break-word;
    }


    a {
        color: #f5f5f5;
    }

    h1 {
        border-bottom: 1px #2a2a2a solid;
    }

    h2 {
        border-bottom: 1px #2a2a2a solid;
        margin-top: 1em;
    }

    h3 {
    }

    h4 {
    }

    h5 {
    }

    h6 {
    }


    p {
        //font-family: "Roboto Mono", monospace;
        font-family: "Poppins", sans-serif;
        text-align: left;
        white-space: pre-line;
        line-height: 1.5;
    }

    ol {
        list-style-type: decimal;
        //font-family: "Roboto Mono", monospace;
        text-align: left;
        line-height: 1.5;
        margin: 0 -60px;
        padding-left: -10px;
    }

    ul {
    }

    li {
        list-style-type: square;
        //font-family: "Roboto Mono", monospace;
        text-align: left;
        margin: 0 50px;
        padding: 0 10px;
        white-space: pre-line;
        line-height: 1.5;
    }

    img {
        margin: 5px 0 50px 0;
        padding: 0;
        width: 100%;
        object-fit: contain;
        border-radius: 5px;
    }

    hr {
        border: 0;
        height: 1px;
        background: #333;
    }

    @media screen and (max-width: 600px) {
        padding: 10px 20px;

        * {
            font-family: "Poppins", sans-serif;
            margin: 10px auto;
        }

        a {
            color: #f5f5f5;
        }

        h1 {
            border-bottom: 1px #2a2a2a solid;
        }

        h2 {
        }

        h3 {
        }

        h4 {
        }

        h5 {
        }

        h6 {
        }

        code {
            font-family: "Roboto Mono", monospace;
            white-space: pre-wrap;
            word-break: break-word;
            background-color: #1d1f21;
            border-radius: 5px;
            overflow-wrap: break-word;
        }

        p {
            //font-family: "Roboto Mono", monospace;
            font-family: "Poppins", sans-serif;
            text-align: left;
            white-space: pre-line;
            line-height: 1.5;
        }

        ol {
            list-style-type: decimal;
            //font-family: "Roboto Mono", monospace;
            text-align: left;
            line-height: 1.5;
            margin: 0 -60px;
            padding-left: -10px;
        }

        ul {
        }

        li {
            list-style-type: square;
            //font-family: "Roboto Mono", monospace;
            text-align: left;
            margin: 0 50px;
            padding: 0 10px;
            white-space: pre-line;
            line-height: 1.5;
        }

        img {
            margin-top: 0;
            object-fit: contain;
            border-radius: 5px;
        }

        hr {
            border: 0;
            height: 1px;
            background: #333;
        }
`;

export default PreviewMarkdown;
