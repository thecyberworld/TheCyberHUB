import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    font-size: 14px;
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 12px;
    margin-top: 4px;
`;

export const FormInput = ({ placeholder, errors, name, register }) => {
    const errorMessage = errors?.[name]?.message || "";

    return (
        <div>
            <StyledInput placeholder={placeholder} {...register(name)} />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </div>
    );
};
