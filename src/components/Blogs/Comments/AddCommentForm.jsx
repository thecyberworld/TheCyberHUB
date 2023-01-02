import React from "react";
import {
    AddCommentFormContainer,
    Form,
    Input,
    // Label,
    Submit,
} from "./AddCommentFormElements";

const AddCommentForm = (props) => {
    return (
        <AddCommentFormContainer>
            <Form onSubmit={props.handleSubmit}>
                {/* <Label htmlFor="goal">Add Comment</Label> */}
                <Input
                    type="text"
                    name="comment"
                    id={"comment"}
                    value={props.comment}
                    onChange={props.onChange}
                    placeholder="Add your comment here..."
                />
                <Submit type="submit">Submit</Submit>
            </Form>
        </AddCommentFormContainer>
    );
};

export default AddCommentForm;
