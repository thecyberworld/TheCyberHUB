"use client";

import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { DoughnutChartContainer } from "./AnalyticsDoughnutChartElements";
import { colorLists, allOptions as newOptions, allDatasets as newDatasets } from "./AnalyticsUtils";
ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart() {
    const datasets = newDatasets.slice(1, 2); // 1
    const options = newOptions.slice(-1); // 1

    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const labels = colorLists;
        setChartData({
            labels,
            datasets,
        });

        setChartOptions(options);
    }, []);

    return (
        <DoughnutChartContainer>
            <Pie options={chartOptions} data={chartData} />
        </DoughnutChartContainer>
    );
}
