import React from "react";
import { AiOutlineReload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { StyledInput, StyledInputContainer, ErrorMessage, IconButton } from "./FormInputElements";

export const FormInput = ({ placeholder, errors, name, register, deletable, removeInput, resetField }) => {
    const errorMessage = errors?.[name]?.message || "";

    const handleInputDelete = (e) => {
        e.preventDefault();
        deletable ? removeInput() : resetField();
    };

    return (
        <div>
            <StyledInputContainer>
                <StyledInput $errorMessage={errorMessage} placeholder={placeholder} {...register(name)} />
                <IconButton onClick={(e) => handleInputDelete(e)}>
                    {deletable ? <MdDelete size={25} /> : <AiOutlineReload size={25} />}
                </IconButton>
            </StyledInputContainer>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </div>
    );
};
