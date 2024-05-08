import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { BarChartContainer } from "./AnalyticsMainBarChartElements";
import { useAnalyticsChartCustomHook } from "./useAnalyticsChartCustomHook";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

import { options, datasets, xDataSet } from "./MainBarChartDataMonths.json";
import {
    options as hoursOptions,
    datasets as hoursDatasets,
    xDataSet as xDataSetHours,
} from "./MainBarChartDataHours.json";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function AnalyticsMainBarChart({ timePeriod }) {
    const [chartValues, setChartValues] = useState({
        newOptions: options,
        newDatasets: datasets,
        displayMonths: xDataSet,
    });
    useEffect(() => {
        const newChartValues =
            timePeriod === "hours"
                ? { newOptions: options, newDatasets: datasets, displayMonths: xDataSet }
                : { newOptions: hoursOptions, newDatasets: hoursDatasets, displayMonths: xDataSetHours };
        setChartValues(newChartValues);
    }, [timePeriod]);

    const [chartData, chartOptions] = useAnalyticsChartCustomHook({ ...chartValues, timePeriod });

    return (
        <BarChartContainer>
            <Bar options={chartOptions} data={chartData} />
        </BarChartContainer>
    );
}
