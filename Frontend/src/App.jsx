import React from "react";
import { Routes, Route} from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import UserHistory from "./pages/UserHistory";
import Analytics from "./pages/Analytics";
import AdminPanel from "./pages/AdminPanel";

const App = () => {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Nested routes for the dashboard */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="upload" element={<Upload />} />
          <Route path="user-history" element={<UserHistory />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="admin" element={<AdminPanel />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
