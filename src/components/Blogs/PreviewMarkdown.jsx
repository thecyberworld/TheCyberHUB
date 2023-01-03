import React from "react";
import { Submit } from "./ManageBlogs/CreateBlog/CreateBlogElements";
import { ContentReactMarkdown, ContentSection } from "./ViewBlog/ViewBlogElements";
import remarkGfm from "remark-gfm";

const PreviewMarkdown = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <ContentSection>
                <ContentReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h2: "h1",
                    }}
                >
                    {" "}
                    {props.content}
                </ContentReactMarkdown>
            </ContentSection>
            <Submit type={"submit"}>Publish Blog</Submit>
        </div>
    );
};

export default PreviewMarkdown;
