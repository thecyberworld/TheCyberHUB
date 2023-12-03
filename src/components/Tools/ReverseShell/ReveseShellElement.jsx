import styled from "styled-components";

export const Input = styled.input`
  padding: 0.5rem;
  font-size: 1.3rem;
  min-width: 15px !important;
  flex: 1;
  color: #f5f5f5;
  background: #131313;
  border: 1px solid #212121;
  border-radius: 5px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1.3rem;
  font-weight: 525;
  background-color: orange;
  color: #131313;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #212121;
  align-items: center;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #07b6f6;
    color: #131313;
    scale: 1.01;
    transition: all 0.2s ease-in-out;
  }

  @media (max-width: 768px) {
    width: 100%;

    &:hover {
      background-color: #07b6f6;
      color: #363636;
      scale: 1.01;
      transition: all 0.2s ease-in-out;
    }
  }
`;

export const Title = styled.h1`
  background: transparent;
  display: flex;
  justify-content: center;
  margin: 0 0 25px 0;
  align-items: center;
  gap: 5px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Dropdown = styled.select`
  appearance: none;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  outline: none;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
