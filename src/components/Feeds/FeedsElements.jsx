import styled from "styled-components";

export const FeedsContainer = styled.div`
    max-width: 1500px;
    width: 100%;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

export const MiddleSection = styled.div`
    max-width: 500px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
    border-left: 1px solid #1a1a1a;
    border-right: 1px solid #1a1a1a;
`;
export const FilterButton = styled.button`
    height: 100%;
    width: 100%;
    gap: 10px;
    padding: 10px;
`;
export const FilterContainer = styled.div`
    background: #131313;
    width: 250px;
    height: 42px;
    margin: auto;
    display: flex;
    flex-direction: row;
    border-radius: 7px;
    overflow: clip;
    margin: 15px;
    align-self: center;
`;
