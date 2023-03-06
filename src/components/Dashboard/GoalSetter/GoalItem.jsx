import React from "react";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../../../features/goals/goalSlice.js";
import {RiDeleteBin2Fill} from 'react-icons/ri'
import { DateCreatedText, DeleteButton, DeleteContainer, GoalBody, GoalContainer } from "./GoalElements.jsx";

const GoalItem = ({ goal }) => {
    const dispatch = useDispatch();

    return (
        <GoalContainer>
            <div >
                <DeleteContainer>
                <DeleteButton onClick={() => dispatch(deleteGoal(goal._id))} className="close">
                    <RiDeleteBin2Fill size={20}/>
                </DeleteButton>
                </DeleteContainer>
                
                <GoalBody>{goal.text}</GoalBody>
                <DateCreatedText>
                    {new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    }).format(new Date(goal.createdAt))}
                </DateCreatedText>
               
            </div>
        </GoalContainer>
    );
};

export default GoalItem;
