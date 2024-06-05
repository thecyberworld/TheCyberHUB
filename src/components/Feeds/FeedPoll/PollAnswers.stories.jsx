import React from "react";
import { PollAnswers } from "./PollAnswers";
import { PollContainer } from "./PollContainer";

export default {
    title: "Components/Poll/PollAnswers",
    component: PollContainer,
    id: "components-poll-questions",
};

const Template = (args) => (
    <PollContainer {...args}>
        <PollAnswers
            answers={[
                { percentage: 50, title: "JavaScript", isCorrectAnswer: true },
                { percentage: 30, title: "Python", isCorrectAnswer: false },
                { percentage: 20, title: "Ruby", isCorrectAnswer: false },
            ]}
        />
    </PollContainer>
);

export const DefaultPollAnswers = Template.bind({});
DefaultPollAnswers.args = {
    title: "What Programming language do you use",
    votes: "57 votes",
    daysLeft: "4 days left",
};
