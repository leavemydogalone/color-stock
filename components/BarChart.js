import React from "react";
import { Bar } from "react-chartjs-2";
import styles from "./ChartContainer.module.css";

export default function BarChart({ chartData }) {
  return (
    <>
      <h2>Current Market Count of Colors</h2>
      <figure className={styles.canvasContainer}>
        <Bar
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                // text: "Market Count of Colors",
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </figure>
    </>
  );
}
