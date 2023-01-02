import React from "react";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { ContainerForum } from "./ForumElements";
import Card from "./Card";
import forumData from "./ForumData";

const Forum = () => {
    return (
        <Wrapper>
            Ask question | Post a Solution
            <ContainerForum>
                {forumData.map((item, id) => (
                    <Card
                        key={id}
                        title={item.title}
                        description={item.description}
                        username={item.username}
                        date={item.date}
                        categories={item.categories}
                        views={item.views}
                        answers={item.answers}
                        answerAccepted={item.answerAccepted}
                        votes={item.votes}
                    />
                ))}
            </ContainerForum>
        </Wrapper>
    );
};

export default Forum;
