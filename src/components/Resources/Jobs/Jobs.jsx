import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";

import { Container, Heading, Overlay, Paragraph } from "../../Community/CommunityElements";
import {
    JobIntroHeader,
    JobsCardSection,
    JobsDetailContainer,
    JobsDetailSection,
    JobsDropdownIcon,
    JobSection,
    ScrollButton,
} from "./JobsElements";

import Job from "./Job";
import { JobsData } from "./JobsData";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import JobDetailsPage from "./JobDetailsPage";

const Jobs = () => {
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    return (
        <Wrapper>
            <JobSection>
                <JobIntroHeader>
                    <Overlay />
                    <Container>
                        <Heading>
                            Searching for a job? <br /> Look no further!
                        </Heading>
                        <Paragraph>
                            Explore job opportunities across various fields with our comprehensive job board. <br />
                            Improve your skills and gain real-world experience through our unpaid internship program.{" "}
                            <br />
                            Performance-based incentives and perks await you after three months, including swag and
                            more!
                        </Paragraph>
                        <ScrollLink to={"jobs"} smooth={true} duration={600} spy={true} exact={"true"} offset={-80}>
                            <ScrollButton>
                                <span>Find A Job</span>
                                <JobsDropdownIcon />
                            </ScrollButton>
                        </ScrollLink>
                    </Container>
                </JobIntroHeader>

                <JobsDetailContainer id="jobs">
                    <JobsCardSection
                        onClick={() => {
                            setDetailsVisible(true);
                        }}
                        style={detailsVisible ? { overflowY: "scroll", height: "100%" } : {}}
                    >
                        {JobsData.map((data) => (
                            <Job
                                key={data.id}
                                onClick={() => {
                                    setSelectedJob(data);
                                }}
                                {...data}
                            />
                        ))}
                    </JobsCardSection>
                    {detailsVisible ? (
                        <JobsDetailSection style={{ float: "right", width: "30%" }}>
                            {selectedJob ? <JobDetailsPage key={selectedJob.id} {...selectedJob} /> : null}
                        </JobsDetailSection>
                    ) : null}
                </JobsDetailContainer>
            </JobSection>
        </Wrapper>
    );
};

export default Jobs;
