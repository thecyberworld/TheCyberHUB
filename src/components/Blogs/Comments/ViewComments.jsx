import React from "react";
import {
    Comment,
    CommentDate,
    CommentSection,
    SectionCommentDetails,
    SectionUserPicture,
    Username,
    UserPicture,
    ViewCommentsContainer,
} from "./ViewCommentsElements";

const ViewComments = (props) => {
    const profilePicture = props.user.picture;
    const profilePictureUrl = `http://localhost:5000/images/${profilePicture}`;

    return (
        <ViewCommentsContainer>
            {props.comments.length} Comments
            {props.comments?.map((userComment, id) => (
                <CommentSection key={id}>
                    <SectionUserPicture>
                        <UserPicture src={profilePictureUrl} alt={props.user.picture} />
                    </SectionUserPicture>
                    <SectionCommentDetails>
                        <Username>{userComment?.username}</Username>
                        <CommentDate> Date: {userComment?.date}</CommentDate>
                        {/* {new Intl.DateTimeFormat("en-US", { */}
                        {/*    month: "short", */}
                        {/*    day: "numeric", */}
                        {/*    year: "numeric", */}
                        {/* }).format(new Date(userComment?.createdAt))} */}
                        <Comment>{userComment?.comment}</Comment>
                        {/* <ReplyButton>Reply</ReplyButton> */}
                        {/* {userComment?.replies.map((reply, id) => ( */}
                        {/*    <ReplySection key={id}>{reply?.reply}</ReplySection> */}
                        {/* ))} */}
                    </SectionCommentDetails>
                </CommentSection>
            ))}
        </ViewCommentsContainer>
    );
};

export default ViewComments;
