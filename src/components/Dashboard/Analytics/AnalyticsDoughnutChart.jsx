"use client";

import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { DoughnutChartContainer } from "./AnalyticsDoughnutChartElements";
import { allOptions as newOptions, allDatasets as newDatasets } from "./AnalyticsUtils";
ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart() {
    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        setChartData({
            datasets: newDatasets.slice(1, 2),
        });

        setChartOptions({ options: newOptions.slice(-1) });
    }, []);

    return (
        <DoughnutChartContainer>
            <Pie options={chartOptions} data={chartData} />
        </DoughnutChartContainer>
    );
}
