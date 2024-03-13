"use client";

import { useState, useEffect } from "react";

const useAnalyticsChartCustomHook = (props) => {
    const { displayMonths, newDatasets, newOptions } = props;

    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const labels = displayMonths;
        const datasets = newDatasets;
        const options = newOptions;

        setChartData({
            labels,
            datasets,
        });
        setChartOptions({ options });
    }, []);

    return [chartData, chartOptions];
};

export default useAnalyticsChartCustomHook;
