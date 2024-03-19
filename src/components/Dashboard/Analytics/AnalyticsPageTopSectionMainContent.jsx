import React from "react";
import {
    TopSection,
    Caption,
    TopSectionCaptionTitle,
    Title,
    CTABtn,
    TopSectionCaptionCTABtnBig,
    TopSectionCaptionCTABtnBigInnerSection,
    TopSectionMainContent,
    InnerCard,
    TopSectionInnerCardCaption,
    TopSectionInnerCardCaptionTitle,
    LastThirtyDaysBtn,
    MainFigure,
    FigureInPercent,
    TopSectionInnerCardMainSectionSummary,
    TopSectionInnerCardMainSection,
    TopSectionInnerCardMainSectionChart,
    // HorizontalStackedBarSection,
    // HorizontalStackedBarLabel,
    // HorizontalStackedBarFirstLabel,
    // HorizontalStackedBarSecondLabel,
    // TopSectionInnerCardMainSectionDateRange,
    // TopSectionInnerCardMainSectionDateRangeStart,
    // TopSectionInnerCardMainSectionDateRangeEnd,
} from "./AnalyticsPageTopSectionMainContentElements";
// import BarChart from "./AnalyticsBarChart";
// import HorizontalStackedBar from "./AnalyticsStackedBar";
// import { DoughnutChart } from "./AnalyticsDoughnutChart";
import { FiInfoIcon, SlCalenderIcon, TbFileDownloadIcon } from "./AnalyticsIconElements";
import { lastAmountOfDays } from "./AnalyticsUtils";
import visitors from "./AnalyticsVisitorsData.json";

const visitorsData = visitors.map((visitor) => (
    <InnerCard key={visitor.id}>
        <TopSectionInnerCardCaption>
            <TopSectionInnerCardCaptionTitle>
                <Title>{visitor.title}</Title>
            </TopSectionInnerCardCaptionTitle>
            <LastThirtyDaysBtn>Last {lastAmountOfDays} days</LastThirtyDaysBtn>
        </TopSectionInnerCardCaption>
        <TopSectionInnerCardMainSection>
            <TopSectionInnerCardMainSectionSummary>
                <MainFigure>{visitor.value}</MainFigure>
                <FigureInPercent>{visitor.percent}</FigureInPercent>
            </TopSectionInnerCardMainSectionSummary>
            <TopSectionInnerCardMainSectionChart>
                {/* <BarChart /> */}
            </TopSectionInnerCardMainSectionChart>
        </TopSectionInnerCardMainSection>
    </InnerCard>
));

const AnalyticsPageTopSectionMainContent = () => {
    console.log(visitors[0].title);

    return (
        <TopSection>
            <Caption>
                <TopSectionCaptionTitle>
                    <Title>Audience </Title>
                    <FiInfoIcon />
                </TopSectionCaptionTitle>
                <CTABtn>
                    <TopSectionCaptionCTABtnBig>
                        <TopSectionCaptionCTABtnBigInnerSection>
                            Last {lastAmountOfDays} days
                            <SlCalenderIcon />
                        </TopSectionCaptionCTABtnBigInnerSection>
                    </TopSectionCaptionCTABtnBig>
                    <TopSectionCaptionCTABtnBig>
                        <TopSectionCaptionCTABtnBigInnerSection>
                            Download
                            <TbFileDownloadIcon />
                        </TopSectionCaptionCTABtnBigInnerSection>
                    </TopSectionCaptionCTABtnBig>
                </CTABtn>
            </Caption>
            <TopSectionMainContent>
            {/* {data.content.body.map(block => 
                <InnerCard key={visitor.id}>                 
                <TopSectionInnerCardCaption>
                    <TopSectionInnerCardCaptionTitle>
                        <Title>{visitor.title}</Title>
                    </TopSectionInnerCardCaptionTitle>
                    <LastThirtyDaysBtn>Last {lastAmountOfDays} days</LastThirtyDaysBtn>
                </TopSectionInnerCardCaption>
                <TopSectionInnerCardMainSection>
                    <TopSectionInnerCardMainSectionSummary>
                        <MainFigure>{visitor.value}</MainFigure>
                        <FigureInPercent>{visitor.percent}</FigureInPercent>
                    </TopSectionInnerCardMainSectionSummary>
                    <TopSectionInnerCardMainSectionChart> 
                        <BarChart />
                    </TopSectionInnerCardMainSectionChart>
                </TopSectionInnerCardMainSection>
            </InnerCard>
                Components(block))} */}
                {visitorsData}
                {/* <InnerCard>
                    <TopSectionInnerCardCaption>
                        <TopSectionInnerCardCaptionTitle>
                            <Title>{visitingTimedata[0].title}</Title>
                        </TopSectionInnerCardCaptionTitle>
                        <LastThirtyDaysBtn>Last {lastAmountOfDays} days</LastThirtyDaysBtn>
                    </TopSectionInnerCardCaption>
                    <TopSectionInnerCardMainSection>
                        <TopSectionInnerCardMainSectionSummary>
                            <MainFigure>{visitingTimedata[0].value}</MainFigure>
                            <FigureInPercent>{visitingTimedata[0].percent}</FigureInPercent>
                        </TopSectionInnerCardMainSectionSummary>
                        <TopSectionInnerCardMainSectionChart>
                            <BarChart />
                        </TopSectionInnerCardMainSectionChart>
                    </TopSectionInnerCardMainSection>
                </InnerCard>
                <InnerCard>
                    <TopSectionInnerCardCaption>
                        <TopSectionInnerCardCaptionTitle>
                            <Title>{visitingTimedata[1].title}</Title>
                        </TopSectionInnerCardCaptionTitle>
                        <LastThirtyDaysBtn>Last {lastAmountOfDays} days</LastThirtyDaysBtn>
                    </TopSectionInnerCardCaption>
                    <TopSectionInnerCardMainSection>
                        <TopSectionInnerCardMainSectionSummary>
                            <MainFigure>{visitingTimedata[1].value}</MainFigure>
                            <FigureInPercent>{visitingTimedata[1].percent}</FigureInPercent>
                        </TopSectionInnerCardMainSectionSummary>
                        <HorizontalStackedBarSection>
                            <HorizontalStackedBarLabel>
                                <HorizontalStackedBarFirstLabel>
                                    {deviceTypeDate[0].mobile}
                                </HorizontalStackedBarFirstLabel>
                                <HorizontalStackedBarSecondLabel>
                                    {deviceTypeDate[0].desktop}
                                </HorizontalStackedBarSecondLabel>
                            </HorizontalStackedBarLabel>
                            <HorizontalStackedBar />
                            <TopSectionInnerCardMainSectionDateRange>
                                <TopSectionInnerCardMainSectionDateRangeStart>
                                    {deviceTypeDate[1].startDate}
                                </TopSectionInnerCardMainSectionDateRangeStart>
                                <TopSectionInnerCardMainSectionDateRangeEnd>
                                    {deviceTypeDate[1].endDate}
                                </TopSectionInnerCardMainSectionDateRangeEnd>
                            </TopSectionInnerCardMainSectionDateRange>
                        </HorizontalStackedBarSection>
                    </TopSectionInnerCardMainSection>
                </InnerCard>
                <InnerCard>
                    <TopSectionInnerCardCaption>
                        <Title>{visitingTimedata[2].title}</Title>
                        <LastThirtyDaysBtn>Last {lastAmountOfDays} days</LastThirtyDaysBtn>
                    </TopSectionInnerCardCaption>
                    <TopSectionInnerCardMainSection>
                        <DoughnutChart />
                    </TopSectionInnerCardMainSection>
                </InnerCard> */}
            </TopSectionMainContent>
        </TopSection>
    );
};

export default AnalyticsPageTopSectionMainContent;
