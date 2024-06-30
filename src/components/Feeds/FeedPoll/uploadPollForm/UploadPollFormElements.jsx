import styled from "styled-components";

export const Button = styled.button`
    font-size: 14px;
    background: ${(props) => (props.disabled ? "#ccc" : "#333")};
    color: ${(props) => (props.disabled ? "#666" : "#fff")};
    border: 1px solid ${(props) => (props.disabled ? "#aaa" : "#555")};
    border-radius: 0.2rem;
    padding: 0.5rem;
    box-shadow: 0 0 1px 1px #f5f5f569;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

    &:hover {
        background: ${(props) => (props.disabled ? "#ccc" : "#444")};
    }
`;

export const Form = styled.form`
    display: flex;
    background: #252525;
    width: 20rem;
    margin: auto;
    border-radius: 15px;
    padding: 1rem;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

export const Text = styled.p`
    color: #fff;
    font-size: 1rem;
`;

export const AddAnswerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

export const Title = styled.p`
    color: #fff;
    font-size: 1.5rem;
`;

export const QuestionBody = styled.textarea`
    font-size: 1.2;
    background: #333;
    color: #fff;
    border-radius: 0.2rem;
    box-shadow: 0 0 1px 1px #f5f5f569;
    min-height: 5rem;
    padding: 0.3rem;
    width: 100%;

    &::placeholder {
        color: #aaa;
    }
`;
