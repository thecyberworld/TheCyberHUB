import React, { useEffect, useState } from "react";

import {
    ModifyActionsContainer,
    ModifyActionButton,
    ModifyActionText,
    ModifyItem,
    ModifyTimeLineList,
    ModifyTimeLineListContainer,
} from "./ModifyElements";
import TimeLineListItemDisplay from "./TimeLineListItemDisplay";

const ModifyTimeLine = ({ eventManageTimelineId, handleCloseChangeMode }) => {
    const [timeLineListItems, setTimeLineListItems] = useState([]);

    useEffect(() => {
        setTimeLineListItems([
            {
                name: "",
                description: "",
                topic: "",
                startTime: "",
                endTime: "",
            },
        ]);
    }, []);

    const handleAddListItem = () => {
        setTimeLineListItems((prevArray) => {
            return [
                ...prevArray,
                {
                    name: "",
                    description: "",
                    topic: "",
                    startTime: "",
                    endTime: "",
                },
            ];
        });
    };
    console.log(timeLineListItems);
    const timeLineList = timeLineListItems.map((timeLineListObj, index) => (
        <TimeLineListItemDisplay timeLineListObj={timeLineListObj} key={index} index={index} />
    ));

    return (
        <ModifyItem>
            <ModifyTimeLineListContainer>
                <ModifyTimeLineList>{timeLineList}</ModifyTimeLineList>
                <ModifyActionButton type="add" onClick={handleAddListItem}>
                    <ModifyActionText type="add">Add</ModifyActionText>
                </ModifyActionButton>
            </ModifyTimeLineListContainer>
            <ModifyActionsContainer>
                <ModifyActionButton type="save">
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
