import React from "react";
import { BlogsCommentsContainer } from "src/components/Blogs/BlogComments/ViewCommentsElements";
import AddCommentForm from "src/components/Blogs/BlogComments/AddCommentForm";
const BlogComments = ({ blogId }) => {
    return (
        <BlogsCommentsContainer>
            <AddCommentForm blogId={blogId} />
        </BlogsCommentsContainer>
    );
};

export default BlogComments;
