import React, { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
    ModifyActionsContainer,
    ModifyActionButton,
    ModifyActionText,
    ModifyItem,
    ModifyTimeLineList,
    ModifyTimeLineListContainer,
    ModifyItemActionsContainer,
} from "./ModifyElements";
import TimeLineListItemDisplay from "./TimeLineListItemDisplay";

const convertFromObjToArray = (objData) => {
    return Object.values(objData);
};
const convertFromArrayToObj = (arrayData) => {
    const newObjData = {};
    arrayData.forEach((item) => {
        newObjData[item._id] = { ...item, id: item._id };
    });
    return newObjData;
};

const ModifyTimeLine = ({ onModify, onCloseChangeMode, modifyEvent, eventManageTimelineId }) => {
    const [timeLineListItems, setTimeLineListItems] = useState({});
    useEffect(() => {
        setTimeLineListItems(() => {
            if (modifyEvent.timeline.length) return convertFromArrayToObj(modifyEvent.timeline);
            const newTemporaryId = nanoid();
            return {
                [newTemporaryId]: {
                    id: newTemporaryId,
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
    const handleRemoveLastItem = () => {
        setTimeLineListItems((prevTimeLineListItems) => {
            const lastItemKey = Object.keys(prevTimeLineListItems)[Object.keys(prevTimeLineListItems).length - 1];
            const newTimeLineListItems = { ...prevTimeLineListItems };
            delete newTimeLineListItems[lastItemKey];
            return newTimeLineListItems;
        });
    };
    const handleAddListItem = () => {
        setTimeLineListItems((prevArray) => {
            const newTemporaryId = nanoid();
            return {
                ...prevArray,
                [newTemporaryId]: {
                    id: newTemporaryId,
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
    const timeLineList = Object.values(timeLineListItems).map((timeLineListItemObj) => {
        return (
            <TimeLineListItemDisplay
                timeLineListItemObj={timeLineListItemObj}
                setTimeLineListItems={setTimeLineListItems}
                key={timeLineListItemObj.id}
            />
        );
    });
    const handleSaveTimeline = () => {
        // validate the every field is not empty
        let validationError = false;
        let timeValidationError = false;
        Object.values(timeLineListItems).some((valueObj) => {
            if (valueObj.startTime >= valueObj.endTime) {
                timeValidationError = true;
                return timeValidationError;
            }
            Object.values(valueObj).some((value) => {
                if (!value) {
                    validationError = true;
                }
                return validationError;
            });
            return validationError;
        });

        if (validationError || timeValidationError) {
            if (timeValidationError) toast.error("The end time can't be before start time");
            if (validationError) toast.error("Some of the input fields are empty, fill all the fields and try again");
            return;
        }
        const timelineArray = convertFromObjToArray(timeLineListItems);
        onModify({ ...modifyEvent, timeline: timelineArray }, eventManageTimelineId);
        onCloseChangeMode();
    };
    return (
        <ModifyItem>
            <ModifyTimeLineListContainer>
                <ModifyTimeLineList>{timeLineList}</ModifyTimeLineList>
                <ModifyItemActionsContainer>
                    <ModifyActionButton type="add" onClick={handleAddListItem}>
                        <ModifyActionText type="add">Add</ModifyActionText>
                    </ModifyActionButton>
                    <ModifyActionButton type="remove" onClick={handleRemoveLastItem}>
                        <ModifyActionText type="remove">Remove</ModifyActionText>
                    </ModifyActionButton>
                </ModifyItemActionsContainer>
            </ModifyTimeLineListContainer>
            <ModifyActionsContainer>
                <ModifyActionButton type="save" onClick={handleSaveTimeline}>
                    <ModifyActionText type="save">Save</ModifyActionText>
                </ModifyActionButton>
                <ModifyActionButton type="cancel" onClick={onCloseChangeMode}>
                    <ModifyActionText type="cancel">Cancel</ModifyActionText>
                </ModifyActionButton>
            </ModifyActionsContainer>
        </ModifyItem>
    );
};
export default ModifyTimeLine;
