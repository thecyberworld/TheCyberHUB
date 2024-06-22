import styled from "styled-components";

export const StyledInput = styled.input`
    font-size: 1rem;
    background: #333;
    color: #fff;
    border: ${({ $errorMessage }) => ($errorMessage ? "1px solid #d32f2f" : "1px solid #555")};
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

export const StyledInputContainer = styled.div`
    display: flex;
`;
export const ErrorMessage = styled.p`
    color: #d32f2f;
    font-size: 0.9rem;
`;

export const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 8px;
    display: flex;
    align-items: center;
`;
