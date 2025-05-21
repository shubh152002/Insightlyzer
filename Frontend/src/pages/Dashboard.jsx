import React, { useState } from "react";
import {
  FiHome,
  FiUpload,
  FiBarChart2,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useNavigate  } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Upload");
  const navigate = useNavigate();

  // state inside Dashboard component
const [uploadFile, setUploadFile] = useState(null);

// upload handler
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
    
    alert(err.response?.data?.message || "Upload failed");
  }
};
  
  return (
    <div className="flex min-h-screen bg-gray-100 ">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex flex-col justify-between py-6 px-4">
        <div>
          <h1 className="text-2xl font-bold mb-10">Insightlyzer</h1>
          <nav className="space-y-6">
            <SidebarItem icon={<FiHome />} label="Home" onClick={() =>navigate("/")} className="hover:text-purple-700" />
            <SidebarItem icon={<FiUsers />} label="User History" onClick={() => setActiveTab("User History")} />
            <SidebarItem icon={<FiUpload />} label="Upload" onClick={() => setActiveTab("Upload")} />
            <SidebarItem icon={<FiBarChart2 />} label="Analyses" onClick={() => setActiveTab("Analyses")} />
            <SidebarItem icon={<FiSettings />} label="Admin" onClick={() => setActiveTab("Admin")} />
          </nav>
        </div>

        <button className="flex items-center gap-2 text-sm hover:text-gray-300">
          <FiLogOut className="text-lg" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold mb-6">{activeTab}</h2>
          <div className="flex items-center gap-3">
            <img src= "null" alt="userlogo" className="w-8 h-8 rounded-full bg-gray-300" />
            <p>username</p>
            <span>...</span>
          </div>
        </div>
        <hr />

        {/* Conditional Rendering Based on Active Tab */}
      

        {activeTab === "User History" && (
          <div className="text-gray-700 p-4 bg-white shadow rounded">
            <h3 className="text-xl font-bold mb-4">User History</h3>
            <p>Show table or list of recent user activity here...</p>
          </div>
        )}

     {activeTab === "Upload" && (
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
)}

        {activeTab === "Analyses" && (
          <div className="text-gray-700 p-4 bg-white shadow rounded">
            <h3 className="text-xl font-bold mb-4">Data Analysis</h3>
            <p>Charts and stats here...</p>
          </div>
        )}

        {activeTab === "Admin" && (
          <div className="text-gray-700 p-4 bg-white shadow rounded">
            <h3 className="text-xl font-bold mb-4">Admin Controls</h3>
            <p>Manage users, roles, or system settings...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, onClick }) => (
  <div
    className="flex items-center gap-3 text-sm hover:text-gray-300 cursor-pointer"
    onClick={onClick}
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </div>
);

const DashboardCard = ({ title, value, change, red }) => (
  <div className="bg-white shadow rounded p-6">
    <h4 className="text-sm font-medium text-gray-500">{title}</h4>
    <p className="text-2xl font-bold mt-2">{value}</p>
    <p className={`text-sm mt-1 ${red ? "text-red-500" : "text-green-500"}`}>
      {change} Since Last Month
    </p>
  </div>
);

const OverviewCard = () => (
  <div className="bg-white p-6 shadow rounded">
    <h4 className="text-sm font-medium text-gray-500 mb-4">Overview</h4>
    {[1, 2, 3, 4].map((_, i) => (
      <div
        key={i}
        className="flex justify-between text-sm text-gray-700 py-1 border-b"
      >
        <span>Member Profit</span>
        <span>+2343</span>
      </div>
    ))}
  </div>
);

const ProgressCard = ({ percent }) => (
  <div className="bg-white p-6 shadow rounded flex flex-col items-center justify-center">
    <h4 className="text-sm font-medium text-gray-500 mb-4">Total Sale</h4>
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
      <div
        className="absolute inset-0 rounded-full border-8 border-[#dc3545] transform rotate-[252deg]"
        style={{
          borderTopColor: "transparent",
          borderLeftColor: "transparent",
          borderBottomColor: "transparent",
        }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
        {percent}%
      </div>
    </div>
  </div>
);

const ActivityCard = () => (
  <div className="bg-white p-6 shadow rounded">
    <div className="flex justify-between items-center mb-4">
      <h4 className="text-sm font-medium text-gray-500">Activity</h4>
      <button className="text-xs text-[#dc3545] hover:underline">
        View All
      </button>
    </div>
    {["yellow", "red", "green", "gray"].map((color, i) => (
      <div
        key={i}
        className="flex items-start gap-2 text-sm text-gray-700 mb-3"
      >
        <span className={`w-3 h-3 rounded-full bg-${color}-500 mt-1`}></span>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
    ))}
  </div>
);

export default Dashboard;
