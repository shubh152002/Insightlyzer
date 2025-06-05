// src/components/ChartSelector.jsx
import { useDispatch, useSelector } from 'react-redux';
import { setXAxis, setYAxis, setChartType } from '../redux/chartSlice';

const chartTypes = ['line', 'bar', 'pie', 'doughnut'];

const ChartSelector = ({ dataKeys }) => {
  const dispatch = useDispatch();
  const { xAxis, yAxis, chartType } = useSelector(state => state.chart);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <select
        className="border p-2 rounded"
        value={xAxis}
        onChange={e => dispatch(setXAxis(e.target.value))}
      >
        <option value="">Select X Axis</option>
        {dataKeys.map(key => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>

      <select
        className="border p-2 rounded"
        value={yAxis}
        onChange={e => dispatch(setYAxis(e.target.value))}
      >
        <option value="">Select Y Axis</option>
        {dataKeys.map(key => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>

      <select
        className="border p-2 rounded"
        value={chartType}
        onChange={e => dispatch(setChartType(e.target.value))}
      >
        <option value="">Select Chart Type</option>
        {chartTypes.map(type => (
          <option key={type} value={type}>{type.toUpperCase()}</option>
        ))}
      </select>
    </div>
  );
};

export default ChartSelector;
