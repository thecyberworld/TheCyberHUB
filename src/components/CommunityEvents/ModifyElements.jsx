import styled from "styled-components";

export const ModifyItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    background: transparent;
    margin-bottom: 1rem;
    gap: 30px;
`;
export const ModifyTimelineList = styled.ul`
    background: transparent;
    width: 95%;
`;
export const ModifyTimelineListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    flex-grow: 3;
`;
export const ModifyActionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    position: relative;
    align-items: end;
    justify-content: space-between;
    height: 150px;
    flex-grow: 1;
`;
export const DayPickerContainer = styled.div`
    border-right: 1px solid #f0f0f0;
    padding-right: 0.75rem;
    .today-date {
        color: #e45221;
        font-weight: 900;
    }
    .selected-date {
        background: #ff6b08;
        color: #111;
    }
`;
export const DetailsInputEventContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 330px;
    width: 100%;
    padding: 0 50px;
    justify-content: space-between;
`;
export const TimelineListItem = styled.li`
    display: flex;
    flex-direction: column;
    height: 250px;
    width: 100%;
    justify-content: space-around;
    border: 3px inset #2e2e2e;
    border-radius: 8px;
    padding: 1rem 1.5rem;
    margin-bottom: 5px;
`;
export const DetailsInputTimelineContainer = styled.div`
    display: grid;
    grid-template-columns: ${({ childElements }) => (childElements === 3 ? "1fr 1.2fr 1fr" : "1fr")};
    column-gap: 20px;
`;
export const DetailsTextInputTimelineContainer = styled.div`
    input {
        width: 100%;
        height: 42px;
    }
`;
export const TimePicking = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
`;

export const InputEditorIconContainer = styled.div`
    margin-right: ${(props) => (props.inputType === "time" ? "0" : "20px")};
`;

export const ModifyActionButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    background: ${(props) => {
        switch (props.type) {
            case "add":
                return "#021902";
            case "save":
                return "#00a8ff";
            case "cancel":
                return "#f14844";
            case "remove":
                return "#441514";
        }
    }};
    margin-top: ${(props) => (props.type === "add" || props.type === "remove") && "10px"};
    color: #f8f8f8;
    &:hover {
        opacity: 0.7;
        cursor: pointer;
    }
`;

export const ModifyItemActionsContainer = styled.div`
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    width: 250px;
`;

export const ModifyActionText = styled.p``;
export const LocationPicking = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const Link = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
`;
export const MaxParticipants = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 40%;
`;
export const LinkEditor = styled.div`
    width: 100%;
    input {
        text-transform: lowercase;
    }
`;
