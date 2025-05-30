import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import "echarts-gl";

const Echart3d = ({ chartData, xLabels, yLabels }) => {
  const option = {
    tooltip: {},
    visualMap: {
      max: Math.max(...chartData.map(item => item[2])),
      inRange: { color: ["#87CEFA", "#1E90FF", "#00008B"] },
    },
    xAxis3D: {
      type: "category",
      name: "X",
      data: xLabels,
    },
    yAxis3D: {
      type: "category",
      name: "Y",
      data: yLabels,
    },
    zAxis3D: {
      type: "value",
      name: "Z",
    },
    grid3D: {
      boxWidth: 100,
      boxDepth: 80,
      viewControl: {
        autoRotate: false,
        distance: 120,
      },
      light: {
        main: { intensity: 1.2 },
        ambient: { intensity: 0.3 },
      },
    },
    series: [
      {
        type: "bar3D",
        data: chartData.map(([x, y, z]) => ({ value: [x, y, z] })),
        shading: "color",
      },
    ],
  };

  return <ReactEcharts option={option} style={{ height: "500px" }} />;
};

export default Echart3d;
