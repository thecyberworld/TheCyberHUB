import React, { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

import {
    ModifyActionsContainer,
    ModifyActionButton,
    ModifyActionText,
    ModifyItem,
    ModifyTimeLineList,
    ModifyTimeLineListContainer,
} from "./ModifyElements";
import TimeLineListItemDisplay from "./TimeLineListItemDisplay";
import { toast } from "react-toastify";

const ModifyTimeLine = ({ eventManageTimelineId, handleCloseChangeMode }) => {
    const [timeLineListItems, setTimeLineListItems] = useState({});
    useEffect(() => {
        setTimeLineListItems(() => {
            const newId = nanoid();
            return {
                [newId]: {
                    id: newId,
                    name: "",
                    description: "",
                    topic: "",
                    startTime: "",
                    endTime: "",
                    eventDay: 1,
                },
            };
        });
    }, []);

    const handleAddListItem = () => {
        setTimeLineListItems((prevArray) => {
            const newId = nanoid();
            return {
                ...prevArray,
                [newId]: {
                    id: newId,
                    name: "",
                    description: "",
                    topic: "",
                    startTime: "",
                    endTime: "",
                    eventDay: 1,
                },
            };
        });
    };
    const timeLineList = Object.values(timeLineListItems).map((timeLineListObj) => (
        <TimeLineListItemDisplay
            timeLineListObj={timeLineListObj}
            setTimeLineListItems={setTimeLineListItems}
            key={timeLineListObj.id}
        />
    ));
    const handleSaveTimeline = () => {
        // validate the every field is not empty
        let validationError = false;
        Object.values(timeLineListItems).some((valueObj) => {
            Object.values(valueObj).some((value) => {
                if (!value) {
                    validationError = true;
                }
                return validationError;
            });
            return validationError;
        });
        if (validationError) {
            toast.error("Some of the input fields are empty, fill all the fields and try again");
            return;
        }
        handleCloseChangeMode();
    };
    return (
        <ModifyItem>
            <ModifyTimeLineListContainer>
                <ModifyTimeLineList>{timeLineList}</ModifyTimeLineList>
                <ModifyActionButton type="add" onClick={handleAddListItem}>
                    <ModifyActionText type="add">Add</ModifyActionText>
                </ModifyActionButton>
            </ModifyTimeLineListContainer>
            <ModifyActionsContainer>
                <ModifyActionButton type="save" onClick={handleSaveTimeline}>
                    <ModifyActionText type="save">Save</ModifyActionText>
                </ModifyActionButton>
                <ModifyActionButton type="cancel" onClick={handleCloseChangeMode}>
                    <ModifyActionText type="cancel">Cancel</ModifyActionText>
                </ModifyActionButton>
            </ModifyActionsContainer>
        </ModifyItem>
    );
};
export default ModifyTimeLine;
