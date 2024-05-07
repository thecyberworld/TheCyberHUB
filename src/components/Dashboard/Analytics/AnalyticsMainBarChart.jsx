import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { BarChartContainer } from "./AnalyticsMainBarChartElements";
import { useAnalyticsChartCustomHook } from "./useAnalyticsChartCustomHook";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// import { options, datasets, displayMonths } from "./MainBarChartDataMonths.json";
import { options, datasets, displayMonths } from "./MainBarChartDataHours.json";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function AnalyticsMainBarChart({ timePeriod }) {
    useEffect(() => {
        fetch("./MainBarChartData.json")
            .then((response) => response.json())
            .then((data) => console.log({ data }));
    }, []);
    const [chartData, chartOptions] = useAnalyticsChartCustomHook({
        displayMonths,
        newDatasets: datasets,
        newOptions: options,
    });

    return (
        <BarChartContainer>
            <Bar options={chartOptions} data={chartData} />
        </BarChartContainer>
    );
}
