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
    font-size: 15px;
    height: 100%;
    width: 100%;
    gap: 10px;
    padding: 5px 10px;
`;
export const FilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    width: 100%;
    background: #131313;
    border-radius: 7px;
    overflow: clip;
    align-self: center;
`;
