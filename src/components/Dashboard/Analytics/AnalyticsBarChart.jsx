"use client";

import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { VerticalBarChartContainer } from "./AnalyticsBarChartElements";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { displayMonths, barChartOptions as options, smallBarChartDatasets as datasets } from "./AnalyticsUtils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart() {
    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});

    const labels = displayMonths(9);

    useEffect(() => {
        setChartData({
            labels,
            datasets,
        });
        setChartOptions(options);
    }, []);

    return (
        <VerticalBarChartContainer>
            <Bar options={chartOptions} data={chartData} />
        </VerticalBarChartContainer>
    );
}
