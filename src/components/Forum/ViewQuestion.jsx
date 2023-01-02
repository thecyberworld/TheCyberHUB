import React from "react";
import forumData from "./ForumData";
import { useParams } from "react-router-dom";
import { encodeURL } from "../Blogs/util";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { ContainerViewQuestion } from "./ViewQuestionElements";

const ViewQuestion = () => {
    const { title } = useParams();
    const question = forumData.find((question) => encodeURL(question.title).toLowerCase() === title.toLowerCase());

    return (
        <Wrapper>
            <ContainerViewQuestion>
                <h1>{question.title}</h1>
                <hr />
                <p>{question.description}</p>
                {question.username} <br />
                {question.date} <br />
                {question.categories} <br />
                {question.views} <br />
                {question.answers} <br />
                {question.votes} <br />
            </ContainerViewQuestion>
        </Wrapper>
    );
};

export default ViewQuestion;
