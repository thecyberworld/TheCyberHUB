import React from "react";
import { Link as ScrollLink } from "react-scroll";

import { Container, Heading, Overlay, Paragraph } from "../../Community/CommunityElements";
import { JobIntroHeader, JobsDropdownIcon, JobSection, ScrollButton } from "./JobsElements";

import Job from "./Job";
import { JobsData } from "./JobsData";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";

const Jobs = () => {
    const allJobs = JobsData.map((data) => <Job key={data.id} {...data} />);

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
                            We have collated several areas/field where there are job vacancy(ies). <br /> Go through the{" "}
                            <span>Job Section</span>, and find one that is best match for you.
                        </Paragraph>
                        <ScrollLink to={"jobs"} smooth={true} duration={600} spy={true} exact={"true"} offset={-80}>
                            <ScrollButton>
                                <span>Find A Job</span>
                                <JobsDropdownIcon />
                            </ScrollButton>
                        </ScrollLink>
                    </Container>
                </JobIntroHeader>

                <div id="jobs" className="grid">
                    {allJobs}
                </div>
            </JobSection>
        </Wrapper>
    );
};

export default Jobs;
