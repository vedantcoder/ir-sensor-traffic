"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";

export default function BadmintonPage() {
  const [total, setTotal] = useState(0);
  const [court1, setCourt1] = useState(false);
  const [court2, setCourt2] = useState(false);

  const fetchData = async () => {
    const res = await fetch("/api/badminton");
    const data = await res.json();
    setTotal(data.total);
    setCourt1(data.court1);
    setCourt2(data.court2);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const triggerSensor = async (sensor: string) => {
    await fetch("/api/badminton", {
      method: "POST",
      body: JSON.stringify({ action: "triggerSensor", sensor }),
    });
    fetchData();
  };

  const toggleCourt = async (court: 1 | 2) => {
    await fetch("/api/badminton", {
      method: "POST",
      body: JSON.stringify({ action: "toggleCourt", court }),
    });
    fetchData();
  };

  const resetGates = async () => {
    await fetch("/api/badminton", {
      method: "POST",
      body: JSON.stringify({ action: "resetGates" }),
    });
    fetchData();
  };

  const resetOccupancy = async () => {
    await fetch("/api/badminton", {
      method: "POST",
      body: JSON.stringify({ action: "resetOccupancy" }),
    });
    fetchData();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Badminton Court Manager
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Monitor court occupancy and manage badminton facility usage in
            real-time
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Overview Stats */}
        <div className="bg-white shadow-2xl rounded-3xl p-10 mb-10 max-w-2xl mx-auto border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-50 to-green-100 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div className="text-left">
                <h2 className="text-4xl font-bold text-gray-800">
                  Total Players
                </h2>
                <p className="text-lg text-gray-600">
                  🏸 Active across all courts
                </p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <span className="text-6xl font-bold text-gray-900 mr-3">
                  {total}
                </span>
                <span className="text-2xl text-gray-500">players</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gate Sensors Section */}
        <div className="bg-white shadow-2xl rounded-3xl p-10 mb-10 max-w-4xl mx-auto border border-gray-100">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Entry/Exit Gate Controls
          </h3>
          <p className="text-lg text-gray-600 text-center mb-8">
            Control the sensors at the main gates to track people entering and
            leaving the facility
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gate 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">
                Gate 1
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => triggerSensor("A1")}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-lg">Sensor A1</div>
                </button>
                <button
                  onClick={() => triggerSensor("B1")}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-lg">Sensor B1</div>
                </button>
              </div>
            </div>

            {/* Gate 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">
                Gate 2
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => triggerSensor("A2")}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-lg">Sensor A2</div>
                </button>
                <button
                  onClick={() => triggerSensor("B2")}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-lg">Sensor B2</div>
                </button>
              </div>
            </div>
          </div>

          {/* Gate Instructions */}
          <div className="mt-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Gate Sensor Instructions
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="flex items-center p-3 bg-white rounded-xl">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mr-3 font-bold">
                  →
                </div>
                <div>
                  <div className="font-semibold">Entry Sequence</div>
                  <div className="text-gray-500">
                    Trigger A → B to enter facility
                  </div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white rounded-xl">
                <div className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mr-3 font-bold">
                  ←
                </div>
                <div>
                  <div className="font-semibold">Exit Sequence</div>
                  <div className="text-gray-500">
                    Trigger B → A to leave facility
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Controls */}
          <div className="mt-8 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-amber-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Admin Controls
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={resetGates}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Reset Gate Sequences
                </div>
              </button>
              <button
                onClick={resetOccupancy}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M10 5a2 2 0 00-2 2v6a2 2 0 004 0V7a2 2 0 00-2-2zM8 7a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Reset Occupancy Count
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Court Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Court 1 */}
          <div className="bg-white shadow-2xl rounded-3xl p-8 border border-gray-100 relative overflow-hidden">
            <div
              className={`absolute top-0 right-0 w-32 h-32 ${
                court1
                  ? "bg-gradient-to-br from-green-50 to-green-100"
                  : "bg-gradient-to-br from-gray-50 to-gray-100"
              } rounded-full -translate-y-16 translate-x-16`}
            ></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Court 1</h3>
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                    court1
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-gray-100 text-gray-600 border border-gray-200"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      court1 ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></div>
                  {court1 ? "In Use" : "Available"}
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Overhead Court Sensor
                </p>
              </div>

              <button
                onClick={() => toggleCourt(1)}
                className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  court1
                    ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                    : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                }`}
              >
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  {court1 ? "Mark as Available" : "Mark as In Use"}
                </div>
              </button>
            </div>
          </div>

          {/* Court 2 */}
          <div className="bg-white shadow-2xl rounded-3xl p-8 border border-gray-100 relative overflow-hidden">
            <div
              className={`absolute top-0 right-0 w-32 h-32 ${
                court2
                  ? "bg-gradient-to-br from-green-50 to-green-100"
                  : "bg-gradient-to-br from-gray-50 to-gray-100"
              } rounded-full -translate-y-16 translate-x-16`}
            ></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Court 2</h3>
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                    court2
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-gray-100 text-gray-600 border border-gray-200"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      court2 ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></div>
                  {court2 ? "In Use" : "Available"}
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Overhead Court Sensor
                </p>
              </div>

              <button
                onClick={() => toggleCourt(2)}
                className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  court2
                    ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                    : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                }`}
              >
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  {court2 ? "Mark as Available" : "Mark as In Use"}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Summary */}
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Court Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-2xl font-bold text-blue-600">{total}</div>
              <div className="text-sm text-gray-600 mt-1">Active Players</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-green-50 to-green-100">
              <div className="text-2xl font-bold text-green-600">
                {2 - (court1 ? 1 : 0) - (court2 ? 1 : 0)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Available Courts</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="text-2xl font-bold text-purple-600">
                {(court1 ? 1 : 0) + (court2 ? 1 : 0)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Courts in Use</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round((((court1 ? 1 : 0) + (court2 ? 1 : 0)) / 2) * 100)}%
              </div>
              <div className="text-sm text-gray-600 mt-1">Utilization Rate</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
