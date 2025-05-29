// src/pages/Analytics.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

const Analytics = () => {
  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState("");
  const [fileData, setFileData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [xCol, setXCol] = useState("");
  const [yCol, setYCol] = useState("");
  const [zCol, setZCol] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/upload/all", { withCredentials: true })
      .then((res) => setFiles(res.data.data))
      .catch((err) => console.error("Error loading files:", err));
  }, []);

  useEffect(() => {
    if (!selectedFileId) return;
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/upload/${selectedFileId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setFileData(res.data.data);
        const sample = res.data.data[0];
        if (sample) {
          setColumns(Object.keys(sample));
        }
      })
      .catch((err) => console.error("Error fetching file data:", err))
      .finally(() => setLoading(false));
  }, [selectedFileId]);

  const buildScatter3DData = () => {
    const xMap = [...new Set(fileData.map((d) => d[xCol]))];
    const yMap = [...new Set(fileData.map((d) => d[yCol]))];

    return fileData.map((d) => {
      const z = parseFloat(d[zCol]);
      return {
        x: xMap.indexOf(d[xCol]),
        y: yMap.indexOf(d[yCol]),
        z: isNaN(z) || z > 100000000 ? 0 : z,
      };
    });
  };

  const scatterData = buildScatter3DData();

  return (
    <div className="p-4 bg-white shadow rounded text-gray-700">
      <h3 className="text-xl font-bold mb-4">Analytics</h3>

      <select
        className="mb-4 border p-2 rounded"
        value={selectedFileId}
        onChange={(e) => setSelectedFileId(e.target.value)}
      >
        <option value="">Select a file</option>
        {files.map((file) => (
          <option key={file._id} value={file._id}>
            {file.fileName}
          </option>
        ))}
      </select>

      {columns.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <select className="border p-2 rounded" value={xCol} onChange={(e) => setXCol(e.target.value)}>
            <option value="">Select X (string or number)</option>
            {columns.map((col) => <option key={col}>{col}</option>)}
          </select>

          <select className="border p-2 rounded" value={yCol} onChange={(e) => setYCol(e.target.value)}>
            <option value="">Select Y (string or number)</option>
            {columns.map((col) => <option key={col}>{col}</option>)}
          </select>

          <select className="border p-2 rounded" value={zCol} onChange={(e) => setZCol(e.target.value)}>
            <option value="">Select Z (number only)</option>
            {columns.map((col) => <option key={col}>{col}</option>)}
          </select>
        </div>
      )}

      {fileData.length > 0 && xCol && yCol && zCol && (
        <Plot
          data={[
            {
              type: "scatter3d",
              mode: "markers",
              x: scatterData.map((d) => d.x),
              y: scatterData.map((d) => d.y),
              z: scatterData.map((d) => d.z),
              marker: {
                size: 4,
                color: scatterData.map((d) => d.z),
                colorscale: "Viridis",
                opacity: 0.8,
              },
            },
          ]}
          layout={{
            width: 700,
            height: 500,
            title: `3D Scatter Chart: ${xCol} vs ${yCol} vs ${zCol}`,
            scene: {
              xaxis: { title: xCol },
              yaxis: { title: yCol },
              zaxis: { title: zCol },
            },
          }}
        />
      )}
    </div>
  );
};

export default Analytics;
