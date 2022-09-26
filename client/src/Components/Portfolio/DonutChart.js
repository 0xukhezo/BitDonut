import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement);
function DonutChart({ labelForChart, portfolioCurrent, totalOfCurrentPrice }) {
  let label = labelForChart;
  let portfolio = totalOfCurrentPrice;

  let data = portfolio.map((coinInPortfolio) => {
    return coinInPortfolio;
  });
  const options = {
    plugins: {
      legend: {
        labels: {
          color: "rgba(255,255,255,1)",
        },
      },
      title: {
        color: "rgba(255,255,255,1)",
        display: true,
        text: "Portfolio",
      },
    },
  };
  const chartData = {
    labels: label,
    datasets: [
      {
        data: data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(240, 128, 128, 0.2)",
          "rgba(255, 160, 122, 0.2)",
          "rgba(245, 183, 177, 0.2)",
          "rgba(210, 180, 222, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(240, 128, 128)",
          "rgb(255, 160, 122)",
          "rgb(245, 183, 177)",
          "rgb(210, 180, 222)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div id="donut">
      <Doughnut data={chartData} options={options} />
    </div>
  );
}

export default DonutChart;
