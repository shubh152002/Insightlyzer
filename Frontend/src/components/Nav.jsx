import React from 'react'

import { Link } from 'react-router-dom';

const Nav = () => {
  return (
   <>
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">Insightlyzer</Link>
        <div className="space-x-4">
          <Link to="/login" className=" bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">Login</Link>
          <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">Register</Link>
        </div>
      </div>
    </nav>
   </>
  )
}

export default Nav
