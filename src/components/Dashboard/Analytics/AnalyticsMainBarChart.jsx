"use client";

import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { VerticalBarChartContainer } from "./AnalyticsMainBarChartElements";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { displayMonths, allOptions as newOptions, allDatasets as newDatasets } from "./AnalyticsUtils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MainBarChart() {
    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        setChartData({
            labels: displayMonths(),
            datasets: newDatasets.slice(-1),
        });

        setChartOptions({ options: newOptions.slice(0, 1) });
    }, []);

    return (
        <VerticalBarChartContainer>
            <Bar options={chartOptions} data={chartData} />
        </VerticalBarChartContainer>
    );
}
