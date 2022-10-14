import React from "react";
import {
  JobSection,
  JobContainer,
  JobHero,
  JobHeader,
  JobTitle,
  JobRole,
  JobRoleTitle,
  JobRating,
  JobType,
  JobDetails,
  JobState,
} from "./JobsElements";

import { FaEllipsisV } from "react-icons/fa";

const Jobs = () => {
  return (
    <JobSection>
      <div className="grid">
        <JobContainer>
          <JobHero>
            <JobHeader>
              <span>new</span>
              <JobTitle className="text-8xl">Data Analysts</JobTitle>
              <JobRole>
                <JobRoleTitle>Cloudstaff</JobRoleTitle>
                <JobRating>4.1⭐</JobRating>
              </JobRole>
              <JobType>
                <span>Remote</span>
              </JobType>
            </JobHeader>
            <FaEllipsisV />
          </JobHero>
          <JobDetails>
            <div>
              <span>💼</span>
              <span>Full-time</span>
            </div>
            <div>
              <span>⏱️</span>
              <span>Morning shifts</span>
            </div>
          </JobDetails>
          <JobState>
            <div>
              <span>⏩</span>
              <span>Apply securely with Indeed Resume</span>
            </div>
            <div>
              <span>⚡</span>
              <span>Responsive employer</span>
            </div>
          </JobState>
          <div className="job-details">
            <ul>
              <li>
                Technical expertise in data models, database design development,
                data mining, and segmentation technique.
              </li>
              <li>
                Strong knowledge of and experience with reporting packages
                (Business Objects, etc.), databases...
              </li>
            </ul>
          </div>
          <div className="job-timeline">
            <span>Posted 3 days ago</span>
            <span></span>
            <span>
              From <span>remote</span>
            </span>
          </div>
        </JobContainer>
      </div>
    </JobSection>
  );
};

export default Jobs;
