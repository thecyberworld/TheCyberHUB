import styled from "styled-components";

export const JobSection = styled.section`
  //   text-align: center;
  margin: 100px 20px;
  color: #cecac3;

  @media screen and (max-width: 760px) {
    // text-align: center;
  }
`;

export const JobContainer = styled.div`
  background: #1a1c1d;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

export const JobHero = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
`;
export const JobHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

export const JobTitle = styled.h2`
  color: #20c20e;
  font-weight: 500;
  letter-spacing: 0.1rem;
`;

export const JobRole = styled.div`
  display: flex;
  column-gap: 0.5rem;
`;
export const JobRoleTitle = styled.span`
  font-weight: 500;
  letter-spacing: 0.1rem;
`;

export const JobRating = styled.span`
  font-weight: bold;
`;

export const JobType = styled.div`
  & > span {
    font-weight: 400;
  }
`;

export const JobDetails = styled.div`
  display: flex;
  column-gap: 0.2rem;
  justify-content: start;

  & > div {
    background: #000;
    border-radius: 3px;
  }
`;

export const JobState = styled(JobDetails)`
  & > div {
    background: #1f1f20;
  }
`;
