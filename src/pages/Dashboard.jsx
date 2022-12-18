import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GoalSetter from "../components/Dashboard/GoalSetter/GoalSetter";
import { Section } from "../components/Learn/Courses/YouTubeVideosElements";
import { getUserDetails, reset } from "../features/userDetails/userDetailSlice";
import Spinner from "../components/MixComponents/Spinner/Spinner";
// import {Count, StreakIcon} from "../components/Dashboard/Streak/StreakElements";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const { userDetails, isLoading, isError, message } = useSelector((state) => state.userDetails);

    console.log(userDetails);

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
        <Section>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
            </section>

            <GoalSetter />
        </Section>
    );
};

export default Dashboard;
