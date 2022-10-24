import React from "react";
import styled from "styled-components";
import {
    DropdownDesc,
    DropdownItem,
    DropdownContainer,
    DropdownRouterLink, DropdownItemContainer, DropdownItemsContainer,
} from "./DropdownElements";

export default function Dropdown({isOpen, toggle, closed, isResources, isLearn}) {
    const learn = [
        {title: "Roadmap", url: "/learn/roadmaps", desc: "Learn about the roadmap of cybersecurity"},
        {title: "Courses", url: "/learn/courses", desc: "Learn about the courses of cybersecurity"},
        {title: "Blogs", url: "/learn/blogs", desc: "Learn about the blogs of cybersecurity"},
    ];

    const resources = [
        {title: "Jobs", url: "/resources/jobs", desc: "Learn about the jobs of cybersecurity"},
        {title: "Quiz", url: "/resources/quiz", desc: "Learn about the quiz of cybersecurity"},
        {title: "Interview Questions", url: "/resources/interviewQuestions", desc: "Learn about the interview questions of cybersecurity"},
        {title: "News", url: "/resources/cyberNews", desc: "Learn about the news of cybersecurity"},
    ];

    return (
        closed && <DropdownContainer isOpen={isOpen}>
            <DropdownItemsContainer>
                {isLearn === true && learn.map((i) =>
                    <DropdownItemContainer>
                        <DropdownRouterLink to={i.url} onClick={() => toggle(false)}>
                            <DropdownItem> {i.title} </DropdownItem>
                            <DropdownDesc> {i.desc} </DropdownDesc>
                        </DropdownRouterLink>
                    </DropdownItemContainer>
                )}
                {isResources === true && resources.map((i) =>
                    <DropdownItemContainer>
                        <DropdownRouterLink to={i.url} onClick={() => toggle(false)}>
                            <DropdownItem> {i.title} </DropdownItem>
                            <DropdownDesc> {i.desc} </DropdownDesc>
                        </DropdownRouterLink>
                    </DropdownItemContainer>
                )}
            </DropdownItemsContainer>

        </DropdownContainer>
    );
}
