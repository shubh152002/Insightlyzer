import React from "react";
import {
  FiHome,
  FiUpload,
  FiBarChart2,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";



const Sidebar = ({closeSidebar}) => {
  const sidebarItems = [
    // { icon: <FiHome />, label: "Home", path: "/dashboard" },
    {
      icon: <FiUsers />,
      label: "User History",
      path: "/dashboard/user-history",
    },
    { icon: <FiUpload />, label: "Upload", path: "/dashboard/upload" },
    { icon: <FiBarChart2 />, label: "Analyses", path: "/dashboard/analytics" },
    { icon: <FiSettings />, label: "Admin", path: "/dashboard/admin" },
  ];
  const navigate = useNavigate();
  const handleNav = (path) =>{
    navigate(path);
    closeSidebar();
  }

  return (
    <div className="w-64 bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex flex-col justify-between py-6 px-4 gap-y-5">
      <div>
        <h1 className="text-2xl font-bold mb-10">Insightlyzer</h1>
        <nav className="space-y-6">
          {sidebarItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 text-sm hover:text-gray-300 cursor-pointer"
              onClick={() => handleNav(item.path)}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
      <button className="flex items-center gap-2 text-sm hover:text-gray-300">
        <FiLogOut className="text-lg" /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
