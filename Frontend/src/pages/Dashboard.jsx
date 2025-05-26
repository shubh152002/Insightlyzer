// src/pages/DashboardLayout.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Dashboardcard from "../components/Dashboardcard";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row  min-h-screen bg-gray-100">
      {/* Mobile Toggle Button */}
      <div className="md:hidden bg-indigo-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Insightlyzer</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-20 bg-indigo-600 md:bg-gradient-to-br md:from-indigo-500 md:to-purple-600 text-white transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-64 h-full md:h-auto`}
      >
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 ">
        <Dashboardcard />
      </div>
    </div>
  );
};

export default Dashboard;
