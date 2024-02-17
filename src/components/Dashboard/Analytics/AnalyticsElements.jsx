import styled from "styled-components";

export const AnalyticsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    padding: 10px;
    width: 100%;
`;

export const Header = styled.header`
    background-color: #151414;
    border: 1px solid #151414;
    border-radius: 5px;
    color: #fff;
    padding: 20px;
    text-align: center;
`;

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 25px;
`;

export const Title = styled.h1`
    color: #fff;
    text-align: center;
`;
export const LeftSection = styled.div`
    flex: 1;
    //padding: 20px;
`;

export const RightSection = styled.div`
    flex: 1;
    //padding: 20px;
    max-width: 300px;
`;

export const Post = styled.div`
    background-color: #1c1c1c;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #eaeaea;

    border: 1px solid #151414;
    border-radius: 5px;
`;

export const SummaryItem = styled.div`
    background-color: #1c1c1c;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #eaeaea;
    border: 1px solid #151414;
    border-radius: 5px;
`;
