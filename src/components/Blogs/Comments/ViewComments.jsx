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
    const API_URL = import.meta.env.VITE_CDN_URL;
    const dummyPicture =
        "https://user-images.githubusercontent.com/44284877/210164205-8dfa753b-f98a-4b25-a243-164c9790b625.png";

    return (
        <ViewCommentsContainer>
            {props.comments?.map((userComment, id) => (
                <CommentSection key={id}>
                    <SectionUserPicture>
                        <UserPicture
                            src={
                                userComment.picture !== undefined ? `${API_URL}/${userComment?.picture}` : dummyPicture
                            }
                            alt={userComment?.picture}
                        />
                    </SectionUserPicture>
                    <SectionCommentDetails>
                        <Username>{userComment?.username}</Username>
                        <CommentDate> Jan 26, 2023</CommentDate>
                        {/* <CommentDate> Date: {userComment?.date}</CommentDate> */}
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
