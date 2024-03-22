import styled from "styled-components";

export const TopSection = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 15px;
    background-color: #151414;
    padding: 20px;
    border: 1px solid #151414;
    border-radius: 5px;
`;

export const Title = styled.h1`
    color: #fff;
    text-align: center;
`;

export const Caption = styled.div`
    display: flex;
    gap: 15px;
`;

export const TopSectionCaptionTitle = styled.div`
    flex: 6;
    display: flex;
    justify-content: flex-start;
    align-items: start;
    color: #fff;
    padding-top: 15px;
    gap: 25px;
`;

export const CTABtn = styled.div`
    flex: 3;
    display: flex;
    gap: 15px;
    font-size: 14px;
`;

export const TopSectionCaptionCTABtnBig = styled.div`
    flex: 3;
    display: flex;
    justify-content: center;
    background-color: black;
    color: #e77b0f;
    font-weight: 600;
    margin: 5px;
    padding: 8px 0;
    border: 0.5px solid grey;
    border-radius: 12px;
    cursor: pointer;
    &:hover {
        transform: scale(1.05);
    }
`;

export const TopSectionCaptionCTABtnBigInnerSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 15px;
`;

export const TopSectionMainContent = styled.div`
    display: flex;
    flex-direction: row;
    text-align: center;
    gap: 18px;
    height: 100%;
`;

export const TopSectionInnerCardCaption = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 15px;
    color: #fff;
`;

export const TopSectionInnerCardCaptionTitle = styled.div`
    flex: 10;
    display: flex;
    justify-content: flex-start;
    color: #fff;
    font-size: 12px;
`;

export const TopSectionInnerCardMainSectionDateRange = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 35px;
    font-size: 11px;
`;

export const TopSectionInnerCardMainSectionDateRangeStart = styled.div`
    display: flex;
    color: grey;
`;

export const TopSectionInnerCardMainSectionDateRangeEnd = styled.div`
    display: flex;
    color: grey;
`;

export const HorizontalStackedBarSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    font-size: 12px;
    margin-top: 0.85rem;
`;

export const HorizontalStackedBarLabel = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    color: grey;
    margin-bottom: 0.75rem;
`;

export const HorizontalStackedBarFirstLabel = styled.div`
    flex: 2;
    display: flex;
    justify-content: flex-start;
`;

export const HorizontalStackedBarSecondLabel = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`;
