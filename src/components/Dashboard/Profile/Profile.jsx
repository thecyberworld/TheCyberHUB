import React from "react";
import { SkillLevel, ProfileContainer, SkillLevels, Wrapper, Heading, SkillLevelContainer } from "./ProfileElements";

const Profile = () => {
    return (
        <Wrapper>
            <ProfileContainer>
                <SkillLevelContainer>
                    <Heading> Task Completed </Heading>
                    <SkillLevels>
                        <SkillLevel> 0 </SkillLevel>
                    </SkillLevels>
                </SkillLevelContainer>
                <SkillLevelContainer>
                    <Heading> Select Your Level </Heading>
                    <SkillLevels>
                        <SkillLevel> Beginner </SkillLevel>
                        <SkillLevel> Intermediate </SkillLevel>
                        <SkillLevel> Expert </SkillLevel>
                    </SkillLevels>
                </SkillLevelContainer>

                <SkillLevelContainer>
                    <Heading> Select Your Role </Heading>
                    <SkillLevels>
                        <SkillLevel> Student </SkillLevel>
                        <SkillLevel> Intern </SkillLevel>
                        <SkillLevel> Professional </SkillLevel>
                    </SkillLevels>
                </SkillLevelContainer>

                <SkillLevelContainer>
                    <Heading> Select Your Role </Heading>
                    <SkillLevels>
                        <SkillLevel> Student </SkillLevel>
                        <SkillLevel> Intern </SkillLevel>
                        <SkillLevel> Professional </SkillLevel>
                    </SkillLevels>
                </SkillLevelContainer>
            </ProfileContainer>
        </Wrapper>
    );
};

export default Profile;
