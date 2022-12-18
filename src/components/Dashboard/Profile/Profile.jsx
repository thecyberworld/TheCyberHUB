import React, { useEffect } from "react";
import { SkillLevel, ProfileContainer, SkillLevels, Wrapper, Heading, SkillLevelContainer } from "./ProfileElements";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, reset } from "../../../features/userDetails/userDetailSlice";
import Spinner from "../../MixComponents/Spinner/Spinner";

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const {
        // userDetails,
        isLoading,
        isError,
        message,
    } = useSelector((state) => state.userDetails);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (user) {
            dispatch(getUserDetails());
        }

        return () => {
            dispatch(reset());
        };
    }, [isError, message, dispatch, user]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Wrapper>
            <ProfileContainer>
                Profile Pic <br />
                Social Links <br />
                Bio <br />
                Name: {user.name} <br />
                Username: {user.username} <br />
                Email: {user.email} <br />
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
