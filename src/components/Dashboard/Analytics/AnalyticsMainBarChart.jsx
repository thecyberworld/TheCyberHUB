import React from "react";
import { Bar } from "react-chartjs-2";
import { BarChartContainer } from "./AnalyticsMainBarChartElements";
import { displayMonths, allOptions as newOptions, allDatasets as newDatasets } from "./AnalyticsUtils";
import { useAnalyticsChartCustomHook } from "./useAnalyticsChartCustomHook";

const { Chart: ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } = await import("chart.js");

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function AnalyticsMainBarChart() {
    const [chartData, chartOptions] = useAnalyticsChartCustomHook({
        displayMonths: displayMonths(),
        newDatasets: newDatasets.slice(-1),
        newOptions: newOptions.slice(0, 1),
    });

    return (
        <BarChartContainer>
            <Bar options={chartOptions} data={chartData} />
        </BarChartContainer>
    );
}
