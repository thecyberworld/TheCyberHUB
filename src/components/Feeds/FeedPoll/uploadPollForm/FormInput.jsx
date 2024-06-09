import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    font-size: 1rem;
    background: #333;
    color: #fff;
    border: ${({ errorMessage }) => (errorMessage ? "1px solid #d32f2f" : "1px solid #555")};
    border-radius: 0.2rem;
    padding: 0.5rem;
    width: 100%;
    box-shadow: 0 0 4px 2px #f5f5f569;

    &::placeholder {
        color: #aaa;
    }

    &:focus {
        outline: none;
        border-color: #fff;
    }
`;
const ErrorMessage = styled.p`
    color: #d32f2f;
    font-size: 0.9rem;
    margin-top: 0.3rem;
`;

export const FormInput = ({ placeholder, errors, name, register }) => {
    const errorMessage = errors?.[name]?.message || "";

    return (
        <div>
            <StyledInput errorMessage={errorMessage} placeholder={placeholder} {...register(name)} />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </div>
    );
};
