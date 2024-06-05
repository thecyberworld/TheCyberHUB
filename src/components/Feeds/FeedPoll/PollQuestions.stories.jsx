import React from "react";
import { PollContainer } from "./PollContainer";
import { PollQuestions } from "./PollQuestions";

export default {
    title: "Components/Poll/PollQuestions",
    component: PollContainer,
    id: "components-poll-answers",
};

const Template = (args) => (
    <PollContainer {...args}>
        <PollQuestions questions={["JavaScript", "Python", "Ruby"]} />
    </PollContainer>
);

export const DefaultPollQuestions = Template.bind({});
DefaultPollQuestions.args = {
    title: "What Programming language do you use",
    votes: "57 votes",
    daysLeft: "4 days left",
};
