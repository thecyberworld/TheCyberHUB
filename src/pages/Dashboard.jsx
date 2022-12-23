import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GoalSetter from "../components/Dashboard/GoalSetter/GoalSetter";
// import { Section } from "../components/Learn/Courses/YouTubeVideosElements";
import { getUserDetails, reset } from "../features/userDetails/userDetailSlice";
import Spinner from "../components/MixComponents/Spinner/Spinner";
import { Wrapper } from "../components/Dashboard/Profile/ProfileElements";
// import {Count, StreakIcon} from "../components/Dashboard/Streak/StreakElements";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const {
        // userDetails,
        isLoading,
        isError,
        message,
    } = useSelector((state) => state.userDetails);

    useEffect(() => {
        if (user && isError) {
            console.log(message);
        }

        if (!user) {
            navigate("/login");
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
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
            </section>
            Dashboard will be live soon
            <br />
            <br />
            <br />
            <br />
            <br />
            <GoalSetter />
        </Wrapper>
    );
};

export default Dashboard;
