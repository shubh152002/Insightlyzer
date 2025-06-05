// src/components/Echart3d.jsx
import React from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import "echarts-gl";

const Echart3d = ({ chartData, xLabels, yLabels, chartType }) => {
  const option = {
    tooltip: {
      formatter: (params) => {
        const x = xLabels[params.value[0]] || params.value[0];
        const y = yLabels[params.value[1]] || params.value[1];
        const z = params.value[2];
        return `X: ${x}<br/>Y: ${y}<br/>Z: ${z}`;
      },
    },
   visualMap: {
  max:
    chartData && chartData.length > 0
      ? Math.max(...chartData.map((d) => parseFloat(d[2]) || 0))
      : 100,
  inRange: {
    color: ["#87CEFA", "#1E90FF", "#00008B"],
  },
},

    xAxis3D: {
      type: "category",
      data: xLabels,
    },
    yAxis3D: {
      type: "category",
      data: yLabels,
    },
    zAxis3D: {
      type: "value",
    },
    grid3D: {
      boxWidth: 150,
      boxDepth: 80,
      light: {
        main: {
          intensity: 1.2,
        },
        ambient: {
          intensity: 0.3,
        },
      },
    },
    series: [
      {
        type: chartType || "bar3D",
        data: chartData,
        shading: "color",
      },
    ],
  };

  return <ReactEcharts option={option} style={{ height: "600px" }} />;
};

export default Echart3d;
