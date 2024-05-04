import React, { useEffect, useState } from "react";
import {
    AnswerContainer,
    BackArrowSection,
    InterviewQuestionContainer,
    InterviewQuestionSection,
    InterviewsAnswerQuestionsHeading,
    InterviewsQuestionsCard,
    InterviewsQuestionsHeading,
    InterviewsQuestionsTitle,
    SingleQuestion,
} from "./InterviewQuestionsElements";
import InterviewsQuestionsData from "./InterviewQuestionsData";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { BackArrow } from "src/components/Resources/Jobs/JobsElements";
import HeadingBanner from "src/components/Common/HeadingBanner/HeadingBanner";

const InterviewQuestions = () => {
    const firstQuestion = InterviewsQuestionsData[0].details[0].question;
    const firstAnswer = InterviewsQuestionsData[0].details[0].answer;

    const [selectedQuestion, setSelectedQuestion] = useState(firstQuestion);
    const [selectedAnswer, setSelectedAnswer] = useState(firstAnswer);

    useEffect(() => {
        setSelectedQuestion(firstQuestion);
        setSelectedAnswer(firstAnswer);
    }, [firstQuestion, firstAnswer]);

    const [isShown, setIsShown] = useState(true);
    const handleIsShown = () => {
        setIsShown(!isShown);
    };
    const onQuestionClick = (questionToFind) => {
        setIsShown(!isShown);
        setSelectedQuestion(questionToFind);
        const questionObject = InterviewsQuestionsData.find((data) =>
            data.details.find((question) => question.question === questionToFind),
        );
        setSelectedAnswer(questionObject.details.find((question) => question.question === questionToFind).answer);
    };

    return (
        <Wrapper>
            <InterviewQuestionContainer>
                <HeadingBanner heading={"Interview Questions"} />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "start",
                        justifyContent: "space-between",
                        gap: "25px",
                        width: "100%",
                    }}
                >
                    {window.innerWidth < 800 ? (
                        isShown ? (
                            <InterviewQuestionSection>
                                {InterviewsQuestionsData.map((Question, index) => {
                                    return (
                                        <InterviewsQuestionsCard key={index}>
                                            <InterviewsQuestionsHeading> {Question.title} </InterviewsQuestionsHeading>
                                            {Question.details.map((resources, index) => {
                                                return (
                                                    <InterviewsQuestionsTitle
                                                        onClick={() => onQuestionClick(resources.question)}
                                                        key={index}
                                                    >
                                                        {/* {index + 1} */}
                                                        <SingleQuestion> {">"} </SingleQuestion> {resources.question}
                                                    </InterviewsQuestionsTitle>
                                                );
                                            })}
                                        </InterviewsQuestionsCard>
                                    );
                                })}
                            </InterviewQuestionSection>
                        ) : (
                            <AnswerContainer>
                                <BackArrowSection>
                                    <BackArrow onClick={handleIsShown} />
                                </BackArrowSection>
                                <InterviewsAnswerQuestionsHeading>
                                    {selectedQuestion && <p>{selectedQuestion}</p>}
                                </InterviewsAnswerQuestionsHeading>
                                {selectedAnswer && selectedAnswer.length > 0 ? <p>{selectedAnswer}</p> : "Coming soon"}
                            </AnswerContainer>
                        )
                    ) : (
                        <>
                            <InterviewQuestionSection>
                                {InterviewsQuestionsData.map((Question, index) => {
                                    return (
                                        <InterviewsQuestionsCard key={index}>
                                            <InterviewsQuestionsHeading> {Question.title} </InterviewsQuestionsHeading>
                                            {Question.details.map((resources, index) => {
                                                return (
                                                    <InterviewsQuestionsTitle
                                                        onClick={() => onQuestionClick(resources.question)}
                                                        key={index}
                                                    >
                                                        {/* {index + 1} */}
                                                        <SingleQuestion> {">"} </SingleQuestion> {resources.question}
                                                    </InterviewsQuestionsTitle>
                                                );
                                            })}
                                        </InterviewsQuestionsCard>
                                    );
                                })}
                            </InterviewQuestionSection>
                            <AnswerContainer>
                                <BackArrowSection>
                                    <BackArrow onClick={handleIsShown} />
                                </BackArrowSection>
                                <InterviewsAnswerQuestionsHeading>
                                    {selectedQuestion && <div>{selectedQuestion}</div>}
                                </InterviewsAnswerQuestionsHeading>
                                {selectedAnswer && selectedAnswer.length > 0 ? <p>{selectedAnswer}</p> : "Coming soon"}
                            </AnswerContainer>
                        </>
                    )}
                </div>
            </InterviewQuestionContainer>
        </Wrapper>
    );
};

export default InterviewQuestions;
