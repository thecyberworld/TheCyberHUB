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
    text-align: center;
    gap: 15px;
    background-color: #151414;
    padding: 20px;
    border: 1px solid #151414;
    border-radius: 5px;
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

export const LastThirtyDaysBtn = styled.div`
    flex: 5;
    display: flex;
    justify-content: flex-end;
    color: grey;
    font-size: 11px;
    font-weight: 600;
`;

export const TopSectionMainContent = styled.div`
    display: flex;
    flex-direction: row;
    text-align: center;
    gap: 18px;
    height: 100%;
`;

export const InnerCard = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
    color: #fff;
    padding: 0.8rem;
    border: 0.5px solid grey;
    border-radius: 5px;
    transition: transform 0.2s; /* Animation */
    &:hover {
        transform: scale(1.05);
    }
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
export const TopSectionInnerCardMainSectionSummary = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 1rem 0 0 0;
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
    text-align: center;
    background-color: #bcfe30;
    color: black;
    font-size: 10px;
    margin-left: 1rem;
    padding: 3px;
    border: 0.5px solid green;
    border-radius: 8px;
`;

export const TopSectionInnerCardMainSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.05rem;
`;

export const TopSectionInnerCardMainSectionChart = styled.div`
    display: flex;
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
`;

export const HorizontalStackedBarLabel = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    color: grey;
    margin-bottom: 3px;
`;

export const HorizontalStackedBarFirstLabel = styled.div`
    flex: 2;
    display: flex;
    justify-content: flex-start;
`;
export const HorizontalStackedBarSecondLabel = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
`;

export const BottomSection = styled.div`
    display: flex;
    flex-direction: row;
    gap: 40px;
    height: 40vw;
`;

export const BottomLeftSection = styled.div`
    flex: 6;
    flex-direction: column;
    display: flex;
    justify-content: flex-start;
    text-align: center;
    background-color: #151414;
    gap: 5px;
    padding: 20px;
    border: 1px solid #151414;
    border-radius: 5px;
`;

export const BottomLeftSectionCaption = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
    background-color: #151414;
    color: #fff;
    border-radius: 5px;
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
    font-size: 12px;
`;

export const TimeCaptionBtnHours = styled.div`
    flex: 3;
    text-align: center;
    background-color: #ff6b07;
    color: black;
    font-weight: 400;
    margin: 15px;
    padding: 8px 14px;
    border: 0.5px solid black;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
        transform: scale(1.05);
    }
`;

export const TimeCaptionBtnDays = styled.div`
    flex: 3;
    text-align: center;
    background-color: #0000ff;
    color: white;
    font-weight: 400;
    margin: 15px;
    padding: 8px 14px;
    border: 0.5px solid grey;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
        transform: scale(1.05);
    }
`;

export const BottomRightSection = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
    gap: 25px;
    background-color: #151414;
    color: #fff;
    border: 1px solid #151414;
    border-radius: 5px;
    padding: 20px;
`;

export const BottomRightSectionInnerCard = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
    height: 100%;
    overflow: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
    color: #fff;
`;

export const PopularPostCard = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    margin: 0 0 10px 0;
    font-size: 12px;
    border-radius: 5px;
    cursor: pointer;
`;
export const PostDetails = styled.div`
    flex: 1;
    display: flex;
    align-items: start;
    font-size: 12px;
`;

export const PostTitleDate = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
    color: #fff;
`;

export const PostTitle = styled.h5`
    display: block;
    justify-content: flex-start;
    align-items: start;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 9vw;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        color: grey;
    }
`;
export const PostDate = styled.p`
    display: flex;
    justify-content: flex-start;
    align-items: start;
    color: grey;
`;

export const PostIcons = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: start;
    color: grey;
    font-size: 11px;
    font-weight: 600;
`;

export const LikesIcon = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &:hover {
        color: #fff;
    }
`;

export const CommentsIcon = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    &:hover {
        color: #fff;
    }
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
