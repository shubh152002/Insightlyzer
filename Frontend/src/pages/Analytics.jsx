import { useEffect, useState } from "react";
import axios from "axios";
import { parseCSVto3DData } from "../utils/parseCSVto3DData";
import Echart3d from "../components/Echart3d";

const Analytics = () => {
  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState("");
  const [fileData, setFileData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [yLabels, setYLabels] = useState([]);
  const [xCol, setXCol] = useState("");
  const [yCol, setYCol] = useState("");
  const [zCol, setZCol] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/upload/all", { withCredentials: true })
      .then((res) => setFiles(res.data.data));
  }, []);

  useEffect(() => {
    if (selectedFileId) {
      axios
        .get(`http://localhost:5000/api/upload/${selectedFileId}`, {
          withCredentials: true,
        })
        .then((res) => setFileData(res.data.data));
    }
  }, [selectedFileId]);

  useEffect(() => {
    if (fileData.length && xCol && yCol && zCol) {
      const { chartData, xLabels, yLabels } = parseCSVto3DData(
        fileData,
        xCol,
        yCol,
        zCol
      );
      setChartData(chartData);
      setXLabels(xLabels);
      setYLabels(yLabels);
    }
  }, [fileData, xCol, yCol, zCol]);

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">3D Analytics Viewer</h2>

      <select
        className="border p-2 rounded mb-4"
        onChange={(e) => setSelectedFileId(e.target.value)}
      >
        <option value="">Select File</option>
        {files.map((file) => (
          <option key={file._id} value={file._id}>
            {file.fileName}
          </option>
        ))}
      </select>

      {fileData.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[xCol, yCol, zCol].map((val, i) => (
            <select
              key={i}
              className="border p-2 rounded"
              value={val}
              onChange={(e) => {
                const val = e.target.value;
                if (i === 0) setXCol(val);
                if (i === 1) setYCol(val);
                if (i === 2) setZCol(val);
              }}
            >
              <option value="">Select {["X", "Y", "Z"][i]} Column</option>
              {Object.keys(fileData[0] || {}).map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          ))}
        </div>
      )}

      {chartData.length > 0 && (
        <Echart3d chartData={chartData} xLabels={xLabels} yLabels={yLabels} />
      )}
    </div>
  );
};

export default Analytics;
