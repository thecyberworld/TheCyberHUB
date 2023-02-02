import styled from "styled-components";
import { GoPrimitiveSquare } from "react-icons/all";

export const SponsorsContainer = styled.div`
    width: 100%;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    color: #fff;
`;

export const SponsorsH1 = styled.h1`
    display: flex;
    text-align: center;
    align-items: center;

    font-family: "Roboto Mono", monospace;
    font-size: 30px;
    margin: 25px;
    @media screen and (max-width: 768px) {
        font-size: 1.5rem;
    }
`;
export const TextGreenBG = styled.div`
    background: #73ff00;
    color: #1a1c1d;
    margin: 0 10px;
    padding: 0 10px;
`;

export const SponsorsDescriptionContainer = styled.div`
    padding: 25px;
    background: #0a0a0a;
    display: flex;
    flex-direction: column;
`;

export const SponsorsDescription = styled.div`
    display: flex;
    flex-direction: row;
`;

export const DotSymbol = styled(GoPrimitiveSquare)`
    color: #20c20e;
    margin: 23px 10px 0;
    font-size: 0.5rem;
    display: inline;
    justify-content: center;
    text-align: center;
`;
export const SponsorsP = styled.p`
    margin: 10px;
    width: 100%;
    font-family: "Poppins", sans-serif;
    text-align: left;
    font-size: 17px;
`;

export const SponsorsLink = styled.a`
    width: 100%;
    margin: 25px 0;
    font-family: "Roboto Mono", monospace;
    display: flex;
    justify-content: center;
    flex-direction: column;

    align-items: center;
    color: #fff;
    text-decoration: none;
    text-align: center;
    cursor: auto;

    &:hover {
        color: #c7c7c7;
        text-decoration: none;
    }
`;

export const BuyMeACoffeeImage = styled.img`
    cursor: pointer;
    background: #73ff00;
    &:hover {
        transform: scale(1.1);
        transition: all 0.3s ease-in-out;
    }

    @media screen and (max-width: 768px) {
        margin: 0;
    }
`;
