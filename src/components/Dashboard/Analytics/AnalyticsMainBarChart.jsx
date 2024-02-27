/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { VerticalBarChartMainSection } from "./AnalyticsMainBarChartElements";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
// import faker from 'faker';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: false,
            text: "Chart.js Bar Chart",
        },
    },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

export default function MainBarChart() {
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
                    data: [345, 567, 765, 453, 676, 876, 564, 234, 440, 280,345, 456],
                    borderColor: 'rgb(128, 128, 128)',
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 106, 9)',
                        'rgb(54, 162, 235)',
                        'rgb(0, 47, 225)',
                        'rgb(255, 205, 86)',
                        'rgb(255, 99, 132)',
                        'rgb(255, 106, 9)',
                        'rgb(54, 162, 235)',
                        'rgb(0, 47, 225)',
                        'rgb(255, 205, 86)',
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
