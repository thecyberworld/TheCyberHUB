import React, { useEffect } from "react";
import { ProfileContainer, UserImage, Wrapper } from "./ProfileElements";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, reset } from "../../../features/userDetails/userDetailSlice";
import Spinner from "../../Other/MixComponents/Spinner/Spinner";
import { Link, useNavigate } from "react-router-dom";

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

    const profilePicture = user.picture;
    const dummyPicture =
        "https://user-images.githubusercontent.com/44284877/210164205-8dfa753b-f98a-4b25-a243-164c9790b625.png";
    const profilePictureUrl =
        profilePicture === dummyPicture ? profilePicture : `http://localhost:5000/images/${profilePicture}`;

    return (
        <Wrapper>
            <ProfileContainer>
                <section className="heading">
                    <h1>Welcome {user && user.name}</h1>
                </section>
                <Link style={{ color: "whitesmoke" }} to={"edit"}>
                    Edit profile
                </Link>
                <h1>Profile Details</h1>
                Name: {user.name} <br />
                <UserImage src={profilePictureUrl} />
                Username: {user.username} <br />
                {/* Type: {user.userType} <br /> */}
                Email: {user.email} <br />
            </ProfileContainer>
        </Wrapper>
    );
};

export default Profile;
