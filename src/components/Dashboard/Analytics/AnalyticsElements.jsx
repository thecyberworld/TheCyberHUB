import styled from "styled-components";

export const AnalyticsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    width: 100%;
`;

export const AnalyticsHeader = styled.header`
    display: flex;
    justify-content: flex-start;    
    background-color: #151414;
    border: 1px solid #151414;
    border-radius: 5px;
    color: #fff;
    padding: 20px;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
`;

export const Title = styled.h1`
    color: #fff;
    text-align: center;
`;

export const TopSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: #151414;
    border: 1px solid #151414;
    border-radius: 5px;
    color: #fff;
    text-align: center;
    padding: 20px;
`;

export const TopSectionCaption = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
    background-color: #151414;
    border-radius: 5px;
    color: #fff;
`;

export const TopSectionCaptionTitle = styled.div`
    flex: 6;
    display: flex;
    justify-content: flex-start;
    background-color: #151414;
    border-radius: 5px;
    color: #fff;
    padding-top: 15px;
`;

export const TopSectionCaptionCTABtn = styled.div`
    flex: 3;
    display: flex;
    flex-direction: row;
    gap: 15px;
    background-color: #151414;
    border-radius: 5px;
    color: #fff;
    text-align: center;
`;
export const LastThirtyDaysBtn = styled.div`
    flex: 5;
    display: flex;
    justify-content: flex-end;
    color: grey;
    font-size: 11px;
    font-weight: 600;
`;

export const TopSectionCaptionCTABtnBig = styled.div`
    flex: 3;
    border: 2px solid white;
    background-color: black;
    border-radius: 12px;
    color: #E77B0F;
    font-weight: 600;
    margin: 5px;
    padding: 12px;
    text-align: center;
    border: 0.5px solid grey;
`;

export const TopSectionMainContent = styled.div`
    display: flex;
    flex-direction: row;
    gap: 18px;
    height: 100%;
    border-radius: 5px;
    color: #fff;
    text-align: center;
`;

export const TopSectionInnerCard = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-radius: 5px;
    color: #fff;
    padding: 8px 15px;
    text-align: center;
    border: 0.5px solid grey;
`;

export const TopSectionInnerCardCaption = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
    background-color: #151414;
    border-radius: 5px;
    color: #fff;
    align-items: baseline;
`;

export const TopSectionInnerCardCaptionTitle = styled.div`
    flex: 10;
    display: flex;
    justify-content: flex-start;
    background-color: #151414;
    border-radius: 5px;
    color: #fff;
    font-size: 12px;

`;
export const TopSectionInnerCardMainSectionSummary = styled.div`
    display: flex;
    justify-content: flex-start;
    background-color: #151414;
    color: #fff;
    padding-top: 5px;
    padding-left: 5px;
`;

export const MainFigure = styled.p`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: white;
    font-size: 16px;
`;

export const FigureInPercent = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #BCFE30;
    border-radius: 8px;
    color: black;
    text-align: center;
    font-size: 10px;
    border: 0.5px solid green;
    margin-left: 1rem;
    padding: 3px;
`;
export const TopSectionInnerCardMainSectionChart = styled.div`
    display: flex;
    // justify-content: flex-start;
    background-color: #151414;
    border-radius: 5px;
    color: #fff;
    font-size: 12px;
`;

export const TopSectionInnerCardMainSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    background-color: #151414;
    border-radius: 5px;
    color: #fff;
`;

export const BottomSection = styled.div`
    height: 40vw;
    display: flex;
    flex-direction: row;
    gap: 40px;
    border-radius: 5px;
    color: #fff;
    text-align: center;
`;

export const BottomLeftSection = styled.div`
    flex: 6;
    flex-direction: column;
    gap: 5px;
    display: flex;
    justify-content: flex-start;
    border: 2px solid white;
    background-color: #151414;
    border: 1px solid #151414;
    border-radius: 5px;
    color: #fff;
    color: #E77B0F;
    padding: 20px;
    text-align: center;
`;

export const BottomLeftSectionCaption = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
    background-color: #151414;
    border-radius: 5px;
    color: #fff;
`;

export const BottomSectionCaptionTitle = styled.div`
    flex: 6;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #151414;
    color: #fff;
`;
export const LastUpdated = styled.p`
    flex: 6;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #151414;
    color: grey;
    font-size:12px;
`;

export const TimeCaptionBtn = styled.div`
    flex: 3;
    background-color: #FF6B07;
    border-radius: 10px;
    color: black;
    font-weight: 400;
    margin: 15px;
    padding: 8px 14px;
    text-align: center;
    border: 0.5px solid black;
`;

export const TimeCaptionBtnTwo = styled.div`
    flex: 3;
    background-color: #0000FF;
    border-radius: 10px;
    color: white;
    font-weight: 400;
    margin: 15px;
    padding: 8px 14px;
    text-align: center;
    border: 0.5px solid grey;
`;
export const BottomRightSection = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 35px;
    justify-content: flex-start;
    border: 2px solid white;
    background-color: #151414;
    border: 1px solid #151414;
    border-radius: 5px;
    color: #fff;
    padding: 20px;
    text-align: center;
`;

export const LeftSection = styled.div`
    flex: 1;
`;

export const RightSection = styled.div`
    flex: 1;
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
