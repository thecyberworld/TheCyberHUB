import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, reset } from "../../../features/userDetails/userDetailSlice";
import Spinner from "../../Other/MixComponents/Spinner/Spinner";
import { StreakContainer, StreakIcon, Streaks } from "./StreakElements";

const Streak = () => {
    const { user } = useSelector((state) => state.auth);
    const { userDetails, isLoading, isError, message } = useSelector((state) => state.userDetails);
    const userData = userDetails.find((userDetails) => user._id === userDetails.user);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) console.log(message);
        if (user) dispatch(getUserDetails());
        return () => dispatch(reset());
    }, [isError, message, dispatch, user]);
    if (isLoading) return <Spinner />;

    return (
        <StreakContainer>
            <Streaks>
                {userData.streak}
                <StreakIcon />
            </Streaks>
        </StreakContainer>
    );
};

export default Streak;
