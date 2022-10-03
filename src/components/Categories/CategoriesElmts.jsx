import styled from "styled-components";

export const CategoriesSection = styled.section`
  margin: 150px auto 0;
  color: #cecac3;
  width: auto;
  //   max-width: 800px;
  //   outline: 0.01px solid white;
  padding: 25px;
  display: flex;
`;

export const CategoriesButton = styled.button`
  background-color: transparent;
  box-shadow: 2px 2px 2px #cecac3;
  color: #cecac3;
  cursor: pointer;
  font-weight: bold;
  outline: 1px solid #cecac3;
  margin: 0 10px;
  padding: 8px;

  &:hover {
    background-color: #cecac3;
    color: #010606;
  }
`;
