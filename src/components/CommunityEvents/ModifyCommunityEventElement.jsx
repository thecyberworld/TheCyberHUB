import styled from "styled-components";

export const ModifyEventItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    background: transparent;
    margin-bottom: 1rem;
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
export const DetailsInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 330px;
    width: 100%;
    padding: 0 50px;
    justify-content: space-between;
`;
export const TimePicking = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
`;

export const InputEditorIconContainer = styled.div`
    margin-right: ${(props) => (props.inputType === "time" ? "10px" : "20px")};
`;
export const TimePickerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const TimeInputLabel = styled.p`
    margin: 0 10px;
`;
export const DisplayDate = styled.p`
    width: 50%;
    margin-right: 10px;
`;
export const TimeInputEditorContainer = styled.div`
    width: 45%;
`;
export const ModifyEventSaveActionButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    background: #00a8ff;
    color: #f8f8f8;
    &:hover {
        opacity: 0.7;
        cursor: pointer;
    }
`;
export const ModifyEventCancelActionButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    background: #f14844;
    color: #f8f8f8;
    &:hover {
        opacity: 0.7;
        cursor: pointer;
    }
`;
export const ModifyEventActionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    position: relative;
    align-items: end;
    justify-content: space-between;
    height: 150px;
`;

export const ModifyEventSaveActionText = styled.p``;
export const ModifyEventCancelActionText = styled.p``;
export const LocationPicking = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const EventLink = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
`;
export const EventMaxParticipants = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 40%;
`;
export const EventLinkEditor = styled.div`
    width: 100%;
    input {
        text-transform: lowercase;
    }
`;
