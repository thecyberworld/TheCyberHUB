import React, { useRef, useState } from "react";
import topics from "./topicsData";
import { useParams } from "react-router-dom";
import { Container } from "./TopicElements";
import Sidebar from "../Sidebar";
import SubTopic from "./SubTopic";

const Topic = () => {
    const { id } = useParams();
    const topic = topics.find((topic) => topic.id === parseInt(id));
    const subtopicRef = useRef(null);

    const [subtopic, setSubtopic] = useState(null);

    const handleSelectSubtopic = (subtopicId) => {
        setSubtopic(subtopicId);
        console.log(subtopic);

        // subtopicRef.current.scrollIntoView({
        //     behavior: 'smooth',
        //     block: 'start',
        // });
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "20px",
            }}
        >
            <Sidebar topics={topics} onSelectSubtopic={handleSelectSubtopic} />
            <Container>
                <h1
                    style={{
                        color: "#ecf0f1",
                        fontSize: "2em",
                        textAlign: "center",
                    }}
                >
                    {topic.title}
                </h1>
                <p
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "fit-content",
                        background: "rgba(224,112,0,0.21)",
                        padding: "5px 15px",
                        borderRadius: "20px",
                        border: "2px solid #e07000",
                        color: "#ecf0f1",
                        alignItems: "center",
                        gap: "5px",
                        margin: "0 auto",
                    }}
                >
                    {" "}
                    {topic.level}{" "}
                </p>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: "20px",
                    }}
                >
                    {topic?.desc?.map((desc, index) => (
                        <SubTopic subtopic={desc} subtopicRef={subtopicRef} key={index} />
                    ))}
                </div>

                {/* <p>Category: {topic.category}</p> */}

                {/* <p>Tags: {topic.tags.map((tag, index) => ( */}
                {/*    <Tag key={index}>{tag}</Tag> */}
                {/* ))}</p> */}
            </Container>
        </div>
    );
};

export default Topic;
