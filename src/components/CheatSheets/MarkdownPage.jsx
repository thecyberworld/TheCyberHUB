import React from "react";
import PreviewMarkdown from "../Blogs/ViewBlog/PreviewMarkdown";

const MarkdownPage = ({ dirName, fileName }) => {
    const [markdown, setMarkdown] = React.useState("");

    React.useEffect(() => {
        fetch(`/src/components/HackBook/${dirName}/${fileName}`)
            .then((response) => response.text())
            .then((text) => setMarkdown(text));
    }, [fileName]);

    return (
        <div>
            <PreviewMarkdown content={markdown} />
        </div>
    );
};

export default MarkdownPage;
