// src/pages/Upload.jsx
import React, { useState } from "react";
import axios from "axios";


const Upload = () => {
  const [uploadFile, setUploadFile] = useState(null);

  const handleSubmitUpload = async (e) => {
    e.preventDefault();

    if (!uploadFile) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadFile);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      
      alert(res.data.message || "File uploaded successfully");

    } catch (err) {
      alert(err.response?.data?.message );
    }
  };

  return (
    <div className="text-gray-700 p-4 bg-white shadow rounded">
      <h3 className="text-xl font-bold mb-4">Upload Section</h3>
      <form className="space-y-4" onSubmit={handleSubmitUpload}>
        <input
          type="file"
          accept=".csv, .xls, .xlsx"
          onChange={(e) => setUploadFile(e.target.files[0])}
          required
          className="block w-full text-sm text-gray-600
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-[#dc3545] file:text-white
            hover:file:bg-red-600"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;

