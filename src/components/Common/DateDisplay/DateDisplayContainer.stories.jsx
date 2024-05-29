import React from "react";
import { DateDisplayContainer } from "./DateDisplayElements";

export default {
    title: "Components/DateDisplay/DateDisplayContainer",
    component: DateDisplayContainer,
    argTypes: {
        rightBorder: { control: "boolean" },
    },
};

const Template = (args) => (
    <DateDisplayContainer {...args}>
        <div className="date">Date display Container Content</div>
    </DateDisplayContainer>
);

export const Default = Template.bind({});
Default.args = {
    rightBorder: false,
};

export const WithRightBorder = Template.bind({});
WithRightBorder.args = {
    rightBorder: true,
};
