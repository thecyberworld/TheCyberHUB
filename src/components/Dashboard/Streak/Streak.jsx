import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, reset } from "../../../features/userDetails/userDetailSlice";
import Spinner from "../../MixComponents/Spinner/Spinner";
import { Count, StreakContainer, StreakIcon, Streaks } from "./StreakElements";

const Streak = () => {
    const { user } = useSelector((state) => state.auth);
    const { userDetails, isLoading, isError, message } = useSelector((state) => state.userDetails);

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
        <StreakContainer>
            <Streaks>
                {userDetails.map((item) => (
                    <Count key={item.id}> {item.streak} </Count>
                ))}
                <StreakIcon />
            </Streaks>
        </StreakContainer>
    );
};

export default Streak;
