// src/redux/chartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chartType: "bar",     // default chart type
  xAxis: "",
  yAxis: "",
  chartData: [],
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setChartType: (state, action) => {
      state.chartType = action.payload;
    },
    setXAxis: (state, action) => {
      state.xAxis = action.payload;
    },
    setYAxis: (state, action) => {
      state.yAxis = action.payload;
    },
    setChartData: (state, action) => {
      state.chartData = action.payload;
    },
    resetChart: () => initialState,
  },
});

export const { setChartType, setXAxis, setYAxis, setChartData, resetChart } = chartSlice.actions;

export default chartSlice.reducer;
