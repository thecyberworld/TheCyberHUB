// Barcharts

export const barChartOptions = {
    plugins: {
        legend: {
            position: "top",
            display: false,
        },
        title: {
            display: false,
            text: "Activity",
        },
    },
    maintainAspectRatio: false,
    responsive: true,
};

export const mainBarChartDatasets = [
    {
        label: "Contributions days",
        data: [345, 567, 765, 453, 676, 876, 564, 234, 440, 280, 440, 280],

        borderColor: "rgb(128, 128, 128)",
        backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 106, 9)",
            "rgb(54, 162, 235)",
            "rgb(0, 47, 225)",
            "rgb(255, 205, 86)",
            "rgb(255, 99, 132)",
            "rgb(255, 106, 9)",
            "rgb(54, 162, 235)",
            "rgb(0, 47, 225)",
            "rgb(255, 205, 86)",
            "rgb(169, 169, 169, 0.1)",
            "rgb(169, 169, 169, 0.1)",
        ],
        hoverOffset: 4,
    },
];

export const smallBarChartDatasets = [
    {
        label: "Contributions days",
        data: [345, 567, 765, 453, 676, 876, 564, 234, 440, 280, 440, 280],

        borderColor: "rgb(128, 128, 128)",
        backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 106, 9)",
            "rgb(54, 162, 235)",
            "rgb(0, 47, 225)",
            "rgb(255, 205, 86)",
            "rgb(169, 169, 169, 0.1)",
            "rgb(169, 169, 169, 0.1)",
            "rgb(169, 169, 169, 0.1)",
            "rgb(169, 169, 169, 0.1)",
            "rgb(169, 169, 169, 0.1)",
            "rgb(169, 169, 169, 0.1)",
            "rgb(169, 169, 169, 0.1)",
            "rgb(169, 169, 169, 0.1)",
        ],
        hoverOffset: 4,
    },
];

export function displayMonths(count) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return months.slice(0, count);
}

// Doughnut chart
export const doughnutChartOptions = {
    plugins: {
        legend: {
            position: "side-right",
            display: false,
        },
        title: {
            display: false,
            text: "Age Average",
        },
    },
    maintainAspectRatio: false,
    responsive: true,
};

export const colorLists = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];

export const doughNutDatasets = [
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
        borderColor: ["rgba(128, 128, 128, 0.8)"],
        borderWidth: 1.25,
        cutout: "40%",
    },
];

// Horizontal Stacked Bars
export const horizontalStackedBardata = [
  {
    value: 65,
    description: "65%",
    color: "blue",
  },
  {
    value: 35,
    description: "35%",
    color: "rgb(255, 205, 86)",
  },
];