import React, { useState } from "react";
import { AddCommentFormContainer, Form, Input } from "src/components/Blogs/BlogComments/AddCommentFormElements";
import { addBlogComment } from "src/features/blogs/blogComments/blogCommentSlice";
import { useDispatch } from "react-redux";
import { ButtonGreen } from "src/components/Other/MixComponents/Buttons/ButtonElements";
import styled from "styled-components";

const EnhancedAddCommentFormContainer = styled(AddCommentFormContainer)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #000; // Set the background color to black
    color: #fff; // Set the text color to white
`;

const CommentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
`;

const AddCommentForm = ({ blogId }) => {
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const onChange = (e) => {
        setComment(e.target.value);
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (comment !== "") {
            const commentData = { comment };
            dispatch(addBlogComment({ blogId, commentData }));
            setComment("");
            setError("");
        } else {
            setError("Please add a comment first.");
        }
    };

    return (
        <EnhancedAddCommentFormContainer>
            <Form onSubmit={handleSubmit}>
                <CommentContainer>
                    <Input
                        type="text"
                        name="comment"
                        id="comment"
                        value={comment}
                        onChange={onChange}
                        placeholder="Add your comment here..."
                    />
                </CommentContainer>
                <ButtonGreen width="100%" type="submit">
                    Submit
                </ButtonGreen>
            </Form>
            {error && <p style={{ marginTop: "10px" }}>{error}</p>}
        </EnhancedAddCommentFormContainer>
    );
};

export default AddCommentForm;
