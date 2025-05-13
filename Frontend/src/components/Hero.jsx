import React from 'react'
import heroImg from '../assets/home.svg'; // You can replace with your own image
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <>
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Turn Excel into Insight with <span className="text-indigo-600">Insightlyzer</span>
          </h1>
          <p className="text-gray-600 mb-6">
            Upload spreadsheets, explore dynamic charts, and extract smart insights in just a few clicks.
          </p>
          <Link to="/register" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition">
            Get Started
          </Link>
        </div>
        <div className="flex-1">
          <img src={heroImg} alt="Excel Analytics Illustration" className="w-full max-w-md mx-auto" />
        </div>
      </div>
    </section>

    </>
  )
}

export default Hero
