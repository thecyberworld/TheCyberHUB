import React from "react";
import { Form, Input, SectionCreateBlog, Submit, TagInput, TextArea } from "./CreateBlog/CreateBlogElements";

const BlogPostForm = (props) => {
    return (
        <SectionCreateBlog>
            <Form onSubmit={props.onSubmit}>
                <div>
                    <Input
                        type="title"
                        name="title"
                        id="title"
                        value={props.title}
                        onChange={props.onChange}
                        placeholder="Title"
                    />
                    <TextArea
                        name="content"
                        id="content"
                        value={props.content}
                        onChange={props.onChange}
                        placeholder="Enter your content here in markdown"
                    />
                    <TagInput
                        type="text"
                        name="tags"
                        id="tags"
                        value={props.tags}
                        onChange={props.onChange}
                        placeholder="tag1, tag2, tag3"
                    />
                </div>
                <div>
                    <Submit type={"submit"}>Publish Blog</Submit>
                </div>
            </Form>
        </SectionCreateBlog>
    );
};

export default BlogPostForm;
