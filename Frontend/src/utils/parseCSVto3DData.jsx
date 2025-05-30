export const parseCSVto3DData = (data, xCol, yCol, zCol) => {
  const xLabels = [...new Set(data.map(d => d[xCol]))];
  const yLabels = [...new Set(data.map(d => d[yCol]))];

  const chartData = data.map(d => [
    xLabels.indexOf(d[xCol]),
    yLabels.indexOf(d[yCol]),
    parseFloat(d[zCol]) || 0
  ]);

  return { chartData, xLabels, yLabels };
};