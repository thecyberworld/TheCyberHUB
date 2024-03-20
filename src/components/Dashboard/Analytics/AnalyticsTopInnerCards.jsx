import React from 'react';
import { 
    AnalyticsInnerCard,
    TopSectionInnerCardCaption,
    TopSectionInnerCardCaptionTitle,
    Title,
    LastThirtyDaysBtn,
    TopSectionInnerCardMainSection,
    TopSectionInnerCardMainSectionSummary,
    MainFigure,
    FigureInPercent,
    TopSectionInnerCardMainSectionChart
 } from "./AnalyticsTopInnerCardsElement";
import { lastAmountOfDays } from "./AnalyticsUtils";


const AnalyticsTopInnerCards = ({key,title,value,percent, children}) => {
  return (
   <>
    <AnalyticsInnerCard key={key} >
        <TopSectionInnerCardCaption>
            <TopSectionInnerCardCaptionTitle>
                <Title>{title}</Title>
            </TopSectionInnerCardCaptionTitle>
            <LastThirtyDaysBtn>Last {lastAmountOfDays} days</LastThirtyDaysBtn>
        </TopSectionInnerCardCaption>
        <TopSectionInnerCardMainSection>
            <TopSectionInnerCardMainSectionSummary>
                <MainFigure>{value}</MainFigure>
                <FigureInPercent>{percent}</FigureInPercent>
            </TopSectionInnerCardMainSectionSummary>
            <TopSectionInnerCardMainSectionChart>
                {children}
            </TopSectionInnerCardMainSectionChart>
        </TopSectionInnerCardMainSection>
    </AnalyticsInnerCard>

   </>
  )
}

export default AnalyticsTopInnerCards;