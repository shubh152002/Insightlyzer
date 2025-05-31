// src/pages/Chart2D.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setChartType, setXAxis, setYAxis, setChartData } from '../redux/chartSlice';
import ChartSelector from '../components/ChartSelector';
import ChartRenderer from '../components/ChartRenderer';

const Chart2d = () => {
  const dispatch = useDispatch();
  const { xAxis, yAxis, chartType, chartData } = useSelector(state => state.chart);

  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState('');
  const [fileData, setFileData] = useState([]);

  // Get files uploaded by the user
  useEffect(() => {
    axios.get('http://localhost:5000/api/upload/all', { withCredentials: true })
      .then(res => setFiles(res.data.data))
      .catch(err => console.log(err));
  }, []);

  // Fetch data for selected file
  useEffect(() => {
    if (!selectedFileId) return;
    axios.get(`http://localhost:5000/api/upload/${selectedFileId}`, { withCredentials: true })
      .then(res => setFileData(res.data.data))
      .catch(err => console.log(err));
  }, [selectedFileId]);

  // Update chart data when x/y axis is selected
  useEffect(() => {
    if (!xAxis || !yAxis || !fileData.length) return;
    const transformedData = fileData.map(row => ({
      x: row[xAxis],
      y: parseFloat(row[yAxis]) || 0,
    }));
    dispatch(setChartData(transformedData));
  }, [xAxis, yAxis, fileData, dispatch]);

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">2D Chart Viewer</h2>

      <select
        className="border p-2 rounded mb-4"
        onChange={e => setSelectedFileId(e.target.value)}
        value={selectedFileId}
      >
        <option value="">Select File</option>
        {files.map(file => (
          <option key={file._id} value={file._id}>{file.fileName}</option>
        ))}
      </select>

      {fileData.length > 0 && (
        <ChartSelector dataKeys={Object.keys(fileData[0])} />
      )}

      {chartData.length > 0 && (
        <ChartRenderer />
      )}
    </div>
  );
};

export default Chart2d;
