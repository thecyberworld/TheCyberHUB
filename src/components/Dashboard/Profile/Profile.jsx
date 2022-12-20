import React, { useEffect } from "react";
import {
    Wrapper,
    ProfileContainer,
    UserImage,
    // SkillLevel,
    // Heading, SkillLevelContainer,
    // SkillLevels,
} from "./ProfileElements";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, reset } from "../../../features/userDetails/userDetailSlice";
import Spinner from "../../MixComponents/Spinner/Spinner";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const {
        // userDetails,
        isLoading,
        isError,
        message,
    } = useSelector((state) => state.userDetails);
    if (!user) {
        navigate("/");
    }
    useEffect(() => {
        if (user && isError) {
            console.log(message);
        }

        if (!user) {
            navigate("/");
        } else {
            dispatch(getUserDetails());
        }

        return () => {
            dispatch(reset());
        };
    }, [isError, message, dispatch, user, navigate]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Wrapper>
            <ProfileContainer>
                <section className="heading">
                    <h1>Welcome {user && user.name}</h1>
                </section>
                <h1>Profile Details</h1>
                Name: {user.name} <br />
                <UserImage src={user.picture} />
                Username: {user.username} <br />
                Email: {user.email} <br />
                {/* <SkillLevelContainer> */}
                {/*    <Heading> Task Completed </Heading> */}
                {/*    <SkillLevels> */}
                {/*        <SkillLevel> 0 </SkillLevel> */}
                {/*    </SkillLevels> */}
                {/* </SkillLevelContainer> */}
                {/* <SkillLevelContainer> */}
                {/*    <Heading> Select Your Level </Heading> */}
                {/*    <SkillLevels> */}
                {/*        <SkillLevel> Beginner </SkillLevel> */}
                {/*        <SkillLevel> Intermediate </SkillLevel> */}
                {/*        <SkillLevel> Expert </SkillLevel> */}
                {/*    </SkillLevels> */}
                {/* </SkillLevelContainer> */}
                {/* <SkillLevelContainer> */}
                {/*    <Heading> Select Your Role </Heading> */}
                {/*    <SkillLevels> */}
                {/*        <SkillLevel> Student </SkillLevel> */}
                {/*        <SkillLevel> Intern </SkillLevel> */}
                {/*        <SkillLevel> Professional </SkillLevel> */}
                {/*    </SkillLevels> */}
                {/* </SkillLevelContainer> */}
                {/* <SkillLevelContainer> */}
                {/*    <Heading> Select Your Role </Heading> */}
                {/*    <SkillLevels> */}
                {/*        <SkillLevel> Student </SkillLevel> */}
                {/*        <SkillLevel> Intern </SkillLevel> */}
                {/*        <SkillLevel> Professional </SkillLevel> */}
                {/*    </SkillLevels> */}
                {/* </SkillLevelContainer> */}
            </ProfileContainer>
        </Wrapper>
    );
};

export default Profile;
