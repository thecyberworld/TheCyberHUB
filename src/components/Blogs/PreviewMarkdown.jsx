import React from "react";
import { Submit } from "./ManageBlogs/CreateBlog/CreateBlogElements";
import {
    ContentReactMarkdown,
    ContentSection,
    PreviewMarkdownHeading,
    Tag,
    TagsSection,
} from "./ViewBlog/ViewBlogElements";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const PreviewMarkdown = (props) => {
    console.log(props.tags);
    return (
        <div>
            <PreviewMarkdownHeading>{props.title !== "" ? props.title : "PLease add a Heading"}</PreviewMarkdownHeading>
            <ContentSection>
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
                                    {" "}
                                    {children}{" "}
                                </code>
                            );
                        },
                    }}
                >
                    {props.content !== "" ? props.content : "PLease add Some Content"}
                </ContentReactMarkdown>
            </ContentSection>
            <TagsSection>
                {props.tags.length !== 0 && props.tags[0] !== ""
                    ? props.tags.map((tag, id) => <Tag key={id}>{tag}</Tag>)
                    : "Please add some Tags"}
            </TagsSection>

            <Submit type={"submit"}>Publish Blog</Submit>
        </div>
    );
};

export default PreviewMarkdown;
