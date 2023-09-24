import React from "react";
import { Bar } from "react-chartjs-2";

export default function BarChart({ chartData }) {
  return (
    <>
      <h2 style={{ textAlign: "center", color: "var(--color-dark)" }}>
        Current Market Count of Colors
      </h2>
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
    </>
  );
}
