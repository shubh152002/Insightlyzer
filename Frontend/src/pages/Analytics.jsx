// src/pages/Analytics.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setChartType,
  setXAxis,
  setYAxis,
  setChartData,
} from "../redux/chartSlice";
import ChartSelector from "../components/ChartSelector";
import ChartRenderer from "../components/ChartRenderer";
import Echart3d from "../components/Echart3d";
import { parseCSVto3DData } from "../utils/parseCSVto3DData";
import ErrorBoundary from "../components/ErrorBoundary";

const chartTypes3D = ["bar3D", "scatter3D", "line3D"];

const Analytics = () => {
  const dispatch = useDispatch();
  const { xAxis, yAxis, chartType, chartData } = useSelector(
    (state) => state.chart
  );

  const [mode, setMode] = useState("2d"); // "2d" or "3d"
  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState("");
  const [fileData, setFileData] = useState([]);

  const [zCol, setZCol] = useState("");
  const [xLabels, setXLabels] = useState([]);
  const [yLabels, setYLabels] = useState([]);
  const [selected3DType, setSelected3DType] = useState("bar3D");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/upload/all", {
        withCredentials: true,
      })
      .then((res) => setFiles(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!selectedFileId) return;
    axios
      .get(`http://localhost:5000/api/upload/${selectedFileId}`, {
        withCredentials: true,
      })
      .then((res) => setFileData(res.data.data))
      .catch((err) => console.log(err));
  }, [selectedFileId]);

  useEffect(() => {
    if (!fileData.length) return;

    if (mode === "2d" && xAxis && yAxis) {
      const transformed = fileData.map((row) => ({
        x: row[xAxis],
        y: parseFloat(row[yAxis]) || 0,
      }));
      dispatch(setChartData(transformed));
    }

    if (mode === "3d" && xAxis && yAxis && zCol) {
      const { chartData, xLabels, yLabels } = parseCSVto3DData(
        fileData,
        xAxis,
        yAxis,
        zCol
      );
      dispatch(setChartData(chartData));
      setXLabels(xLabels);
      setYLabels(yLabels);
    }
  }, [fileData, mode, xAxis, yAxis, zCol, dispatch]);

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Analytics Viewer</h2>

      {/* Mode Toggle */}
      <div className="mb-4 flex gap-4">
        <button
          className={`px-4 py-2 rounded ${
            mode === "2d" ? "bg-indigo-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("2d")}
        >
          2D Chart
        </button>
        <button
          className={`px-4 py-2 rounded ${
            mode === "3d" ? "bg-indigo-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("3d")}
        >
          3D Chart
        </button>
      </div>

      {/* File Selector */}
      <select
        className=" border p-2 rounded mb-4"
        onChange={(e) => setSelectedFileId(e.target.value)}
        value={selectedFileId}
      >
        <option value="">Select File</option>
        {files.map((file) => (
          <option key={file._id} value={file._id}>
            {file.fileName}
          </option>
        ))}
      </select>

      {fileData.length > 0 && (
        <>
          {/* Axis/Chart Selector for 2D */}
          {mode === "2d" && (
            <ChartSelector dataKeys={Object.keys(fileData[0])} />
          )}

          {/* Axis and Type Selector for 3D */}
          {mode === "3d" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {[xAxis, yAxis, zCol].map((val, i) => (
                  <select
                    key={i}
                    className="border p-2 rounded"
                    value={val}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (i === 0) dispatch(setXAxis(value));
                      if (i === 1) dispatch(setYAxis(value));
                      if (i === 2) setZCol(value);
                    }}
                  >
                    <option value="">Select {["X", "Y", "Z"][i]} Column</option>
                    {Object.keys(fileData[0]).map((key) => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                ))}
              </div>
              <div className="mb-4">
                <select
                  className="border p-2 rounded"
                  value={selected3DType}
                  onChange={(e) => setSelected3DType(e.target.value)}
                >
                  {chartTypes3D.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Chart Output */}
          {mode === "2d" && chartData.length > 0 && <ChartRenderer />}
          {mode === "3d" && chartData.length > 0 && (
            <ErrorBoundary>
              <Echart3d
                chartData={chartData}
                xLabels={xLabels}
                yLabels={yLabels}
                chartType={selected3DType}
              />
            </ErrorBoundary>
          )}
        </>
      )}
    </div>
  );
};

export default Analytics;
