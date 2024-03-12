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
    HorizontalStackedBarSection,
    HorizontalStackedBarLabel,
    HorizontalStackedBarFirstLabel,
    HorizontalStackedBarSecondLabel,
    TopSectionInnerCardMainSectionDateRange,
    TopSectionInnerCardMainSectionDateRangeStart,
    TopSectionInnerCardMainSectionDateRangeEnd,
} from "./AnalyticsPageTopSectionMainContentElements";
import BarChart from "./AnalyticsBarChart";
import HorizontalStackedBar from "./AnalyticsStackedBar";
import { DoughnutChart } from "./AnalyticsDoughnutChart";
import { FiInfoIcon, SlCalenderIcon, TbFileDownloadIcon } from "./AnalyticsIconElements";
import { endDate, lastAmountOfDays, startDate } from "./AnalyticsUtils";

const AnalyticsPageTopSectionMainContent = () => {
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
                <InnerCard>
                    <TopSectionInnerCardCaption>
                        <TopSectionInnerCardCaptionTitle>
                            <Title>Most Active Times</Title>
                        </TopSectionInnerCardCaptionTitle>
                        <LastThirtyDaysBtn>Last {lastAmountOfDays} days</LastThirtyDaysBtn>
                    </TopSectionInnerCardCaption>
                    <TopSectionInnerCardMainSection>
                        <TopSectionInnerCardMainSectionSummary>
                            <MainFigure>1.234</MainFigure>
                            <FigureInPercent>+89.67%</FigureInPercent>
                        </TopSectionInnerCardMainSectionSummary>
                        <TopSectionInnerCardMainSectionChart>
                            <BarChart />
                        </TopSectionInnerCardMainSectionChart>
                    </TopSectionInnerCardMainSection>
                </InnerCard>
                <InnerCard>
                    <TopSectionInnerCardCaption>
                        <TopSectionInnerCardCaptionTitle>
                            <Title>Total Visitor</Title>
                        </TopSectionInnerCardCaptionTitle>
                        <LastThirtyDaysBtn>Last {lastAmountOfDays} days</LastThirtyDaysBtn>
                    </TopSectionInnerCardCaption>
                    <TopSectionInnerCardMainSection>
                        <TopSectionInnerCardMainSectionSummary>
                            <MainFigure>1.004</MainFigure>
                            <FigureInPercent>+71.80%</FigureInPercent>
                        </TopSectionInnerCardMainSectionSummary>
                        <HorizontalStackedBarSection>
                            <HorizontalStackedBarLabel>
                                <HorizontalStackedBarFirstLabel>Mobile</HorizontalStackedBarFirstLabel>
                                <HorizontalStackedBarSecondLabel>Desktop</HorizontalStackedBarSecondLabel>
                            </HorizontalStackedBarLabel>
                            <HorizontalStackedBar />
                            <TopSectionInnerCardMainSectionDateRange>
                                <TopSectionInnerCardMainSectionDateRangeStart>
                                    {startDate}
                                </TopSectionInnerCardMainSectionDateRangeStart>
                                <TopSectionInnerCardMainSectionDateRangeEnd>
                                    {endDate}
                                </TopSectionInnerCardMainSectionDateRangeEnd>
                            </TopSectionInnerCardMainSectionDateRange>
                        </HorizontalStackedBarSection>
                    </TopSectionInnerCardMainSection>
                </InnerCard>
                <InnerCard>
                    <TopSectionInnerCardCaption>
                        <Title>Age Average</Title>
                        <LastThirtyDaysBtn>Last {lastAmountOfDays} days</LastThirtyDaysBtn>
                    </TopSectionInnerCardCaption>
                    <TopSectionInnerCardMainSection>
                        <DoughnutChart />
                    </TopSectionInnerCardMainSection>
                </InnerCard>
            </TopSectionMainContent>
        </TopSection>
    );
};

export default AnalyticsPageTopSectionMainContent;
