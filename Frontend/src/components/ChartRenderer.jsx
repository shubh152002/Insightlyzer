import React from 'react';
import { useSelector } from 'react-redux';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const ChartRenderer = () => {
  const { chartType, chartData, xAxis, yAxis } = useSelector((state) => state.chart);

  const labels = chartData.map((d) => d.x);
  const values = chartData.map((d) => d.y);

  const data = {
    labels,
    datasets: [
      {
        label: `${yAxis} vs ${xAxis}`,
        data: values,
        backgroundColor: [
          '#4F46E5', '#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE'
        ],
        borderColor: '#4F46E5',
        borderWidth: 1,
      },
    ],
  };

  switch (chartType) {
    case 'line':
      return <Line data={data} />;
    case 'pie':
      return <Pie data={data} />;
    case 'doughnut':
      return <Doughnut data={data} />;
    case 'bar':
    default:
      return <Bar data={data} />;
  }
};

export default ChartRenderer;
