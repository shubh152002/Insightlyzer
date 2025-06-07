// src/components/ChartDownloadButtons.jsx
import jsPDF from "jspdf";

const ChartDownloadButtons = ({ chartRef }) => {
  const handleDownloadImage = () => {
    if (!chartRef?.current) return;
    const base64 = chartRef.current.getEchartsInstance().getDataURL({
      type: "png",
      pixelRatio: 2,
      backgroundColor: "#fff",
    });

    const link = document.createElement("a");
    link.href = base64;
    link.download = "chart.png";
    link.click();
  };

  const handleDownloadPDF = () => {
    if (!chartRef?.current) return;
    const base64 = chartRef.current.getEchartsInstance().getDataURL({
      type: "png",
      pixelRatio: 2,
      backgroundColor: "#fff",
    });

    const pdf = new jsPDF();
    pdf.addImage(base64, "PNG", 10, 10, 180, 100);
    pdf.save("chart.pdf");
  };

  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={handleDownloadImage}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Download Image
      </button>
      <button
        onClick={handleDownloadPDF}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Download PDF
      </button>
    </div>
  );
};

export default ChartDownloadButtons;

