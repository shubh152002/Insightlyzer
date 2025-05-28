import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadCard from "../components/Uploadcard"; // adjust path if needed

const UserHistory = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUploads = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/upload/all", {
        withCredentials: true,
      });
      setUploads(res.data.data);
    } catch (err) {
      console.error("Error fetching uploads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        Your Upload History
      </h3>

      {loading ? (
        <p>Loading...</p>
      ) : uploads.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {uploads.map((upload, index) => (
            <UploadCard key={upload._id} upload={upload} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserHistory;
