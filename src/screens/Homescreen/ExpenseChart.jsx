import React from "react";
import Chart from "react-google-charts";

export const options = {
  title: "Expense Distribution",
  pieHole: 0.4, // Creates a doughnut chart
  backgroundColor: "#181c14",
  chartArea: {
    width: "90%",
    height: "90%",
  },
  legend: {
    position: "right",
    alignment: "center",
    textStyle: {
      color: "#fff",
      fontSize: 14,
    },
  },
  colors: ["#136aa0", "#7954cf", "#cb2a4d", "#9cd120", "#cfab29", "#08dfa6"],
  sliceVisibilityThreshold: 0.02, // Minimum slice size to be visible

  enableInteractivity: true, // Allow interactivity with the chart
};

export default function ExpenseChart({ chartData }) {
  // Transform the chartData into the required format
  const data = [
    ["Category", "Amount"],
    ...chartData.map((item) => [item._id, item.total_Amounnt]),
  ];

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height="100%"
    />
  );
}
