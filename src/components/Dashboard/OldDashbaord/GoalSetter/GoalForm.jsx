import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "src/features/goals/goalSlice";
import { toast } from "react-toastify";
import styled from "styled-components";

const GoalInput = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid ${(props) => (props.error ? "red" : "#e6e6e6")};
    border-radius: 5px;
    margin-bottom: 10px;
    font-family: inherit;
    color: #1c1c1c;
`;

const GoalForm = () => {
    const [text, setText] = useState("");
    const [error, setError] = useState(false);

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === "") {
            toast.warn("Cannot submit empty goal");
            setError(true);
            return;
        }

        dispatch(createGoal({ text }));
        setError(false);
        setText("");
    };

    return (
        <section className={"form"}>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="goal">Goal</label>
                    <GoalInput
                        type="text"
                        name="text"
                        id="text"
                        value={text}
                        error={error}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="What's your goal?"
                    />
                    <button
                        className={"btn btn-block !bg-[#ff6b08] !text-[#1c1c1c] hover:opacity-[.95]"}
                        type={"submit"}
                    >
                        +
                    </button>
                </div>
            </form>
        </section>
    );
};

export default GoalForm;
