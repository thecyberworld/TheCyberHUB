import React from "react";
import { Bar } from "react-chartjs-2";
import { BarChartContainer } from "./AnalyticsMainBarChartElements";
import { useAnalyticsChartCustomHook } from "./useAnalyticsChartCustomHook";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

import { options, datasets, displayMonths } from "./MainBarChartData.json";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function AnalyticsMainBarChart({ timePeriod }) {
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
