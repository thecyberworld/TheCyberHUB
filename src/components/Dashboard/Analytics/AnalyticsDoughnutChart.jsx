"use client";

import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { DoughnutChartContainer } from "./AnalyticsDoughnutChartElements";
import { doughnutChartOptions as options, colorLists, doughNutDatasets as datasets } from "./AnalyticsUtils";
ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart() {
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
