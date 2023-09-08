import React, { useContext, useEffect } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { ColorsContext } from "../utils/ColorsProvider";
import BarChart from "./BarChart";
import styles from "./ChartContainer.module.css";

Chart.register(CategoryScale);

export default function ChartContainer() {
  const [chartData, setData] = useState(null);
  const colorsContextProvider = useContext(ColorsContext);

  const { colors } = colorsContextProvider;

  useEffect(() => {
    if (colors.length > 1) {
      setData({
        labels: colors.map((color) => color.name),
        datasets: [
          {
            label: "Current Market Count",
            data: colors.map((color) => color.count),
            backgroundColor: colors.map((color) => color.name),
            borderColor: "black",
          },
        ],
      });
    }
    console.log(chartData);
  }, [colors]);

  return (
    <div className={styles.chartContainer}>
      {chartData ? <BarChart chartData={chartData} /> : "Loading"}
    </div>
  );
}
