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
import getApiUrl from "../../../features/apiUrl";

const ViewComments = (props) => {
    const profilePicture = props.user.picture;
    const API_URL = getApiUrl("images");
    const profilePictureUrl = `${API_URL}/${profilePicture}`;

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
