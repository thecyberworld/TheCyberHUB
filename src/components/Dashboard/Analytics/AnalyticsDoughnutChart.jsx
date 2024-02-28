"use client";

import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { DoughnutChart } from "./AnalyticsDoughnutChartElements";

ChartJS.register(ArcElement, Tooltip, Legend);


export function Doughnut() {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [10, 13, 8, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 65, 105)",
            "rgba(0, 47, 255)",
            "rgba(255, 106, 9)",
            "rgba(255, 0, 0)",
            "rgba(75, 192, 192)",
            "rgb(255, 205, 86)",
          ],
          borderColor: [
            "rgba(128, 128, 128, 0.8)",
          ],
          borderWidth: 1.25,
          cutout: "40%",
        },
      ],
    });

    setChartOptions({
      plugins: {
        legend: {
          position: "side-right",
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
    <DoughnutChart>
      <Pie options={chartOptions} data={chartData} />
    </DoughnutChart>
  );
}
