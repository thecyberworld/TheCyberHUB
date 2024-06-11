import React from "react";
import styled from "styled-components";
import { AiOutlineReload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

export const FormInput = ({ placeholder, errors, name, register, deletable, removeInput, resetField }) => {
    const errorMessage = errors?.[name]?.message || "";

    const handleIconClick = (e) => {
        e.preventDefault();
        deletable ? removeInput() : resetField();
    };

    return (
        <div>
            <StyledInputContainer>
                <StyledInput errorMessage={errorMessage} placeholder={placeholder} {...register(name)} />
                <IconButton onClick={(e) => handleIconClick(e)}>
                    {deletable ? <MdDelete size={25} /> : <AiOutlineReload size={25} />}
                </IconButton>
            </StyledInputContainer>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </div>
    );
};

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

const StyledInputContainer = styled.div`
    display: flex;
`;
export const ErrorMessage = styled.p`
    color: #d32f2f;
    font-size: 0.9rem;
`;

const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 8px;
    display: flex;
    align-items: center;
`;
