"use client";

import React, { useState, useEffect } from "react";
import { Bar as ChartType } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { ChartContainer } from './AnalyticsChartElements';
import { displayMonths, allOptions as newOptions, allDatasets as newDatasets } from "./AnalyticsUtils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnalyticsCharts = ({props}) => {
  const [chartData, setChartData] = useState({
    datasets: [],
});
const [chartOptions, setChartOptions] = useState({});

useEffect(() => {
    setChartData({
        labels: displayMonths(),
        datasets: newDatasets,
    });
    setChartOptions({ options: newOptions });
}, []);

  return (
    <ChartContainer>
      <ChartType options={chartOptions} data={chartData} />
    </ChartContainer>
  )
}

export default AnalyticsCharts