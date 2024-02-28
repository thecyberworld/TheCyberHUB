
"use client";

import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { VerticalBarChartMainSection } from "./AnalyticsBarChartElements";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Chart.js Bar Chart",
        },
    },
};


export default function BarChart() {
    const [chartData, setChartData] = useState({
        datasets: [],
    });

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        setChartData({
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    label: "Sales $",
                    data: [345, 567, 765, 453, 676, 876, 564, 234, 440, 280, 440, 280],
                    borderColor: 'rgb(128, 128, 128)',
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 106, 9)',
                        'rgb(54, 162, 235)',
                        'rgb(0, 47, 225)',
                        'rgb(255, 205, 86)',
                        "rgb(169, 169, 169, 0.1)",
                        "rgb(169, 169, 169, 0.1)",
                        "rgb(169, 169, 169, 0.1)",
                        "rgb(169, 169, 169, 0.1)",
                        "rgb(169, 169, 169, 0.1)",
                        "rgb(169, 169, 169, 0.1)",
                        "rgb(169, 169, 169, 0.1)",
                        "rgb(169, 169, 169, 0.1)",
                      ],
                      hoverOffset: 4
                },
            ],
        });

        setChartOptions({
            plugins: {
                legend: {
                    position: "top",
                    display: false,
                },
                title: {
                    display: false,
                    text: "Daily Revenue",
                },
            },
            maintainAspectRatio: false,
            responsive: true,
        });
    }, []);

    return (

        <VerticalBarChartMainSection>
            <Bar options={chartOptions} data={chartData} />
        </VerticalBarChartMainSection>
    );
}
