"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";

export default function GymPage() {
  const [occupancy, setOccupancy] = useState(0);
  const [lastSensor, setLastSensor] = useState<string | null>(null);

  const fetchOccupancy = async () => {
    const res = await fetch("/api/gym");
    const data = await res.json();
    setOccupancy(data.occupancy);
  };

  useEffect(() => {
    fetchOccupancy();
  }, []);

  const handleSensorTrigger = async (sensor: "A" | "B") => {
    if (!lastSensor) {
      setLastSensor(sensor);
      return;
    }

    const sequence = `${lastSensor}${sensor}`;

    let direction: "in" | "out" | null = null;
    if (sequence === "AB") direction = "in";
    else if (sequence === "BA") direction = "out";

    if (direction) {
      await fetch("/api/gym", {
        method: "POST",
        body: JSON.stringify({ direction }),
      });
      fetchOccupancy();
    }

    setLastSensor(null); // Reset after each sequence
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Gym Occupancy Control
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Monitor and simulate real-time gym occupancy with sensor controls
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Main Stats Card */}
        <div className="bg-white shadow-2xl rounded-3xl p-10 mb-10 max-w-2xl mx-auto border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-50 to-red-100 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-gray-800">
                Current Occupancy
              </h2>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <span className="text-6xl font-bold text-gray-900 mr-3">
                  {occupancy}
                </span>
                <span className="text-2xl text-gray-500">people</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden max-w-md mx-auto">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((occupancy / 50) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-lg text-gray-500 mt-3">Capacity: 50 people</p>
            </div>

            {/* Status Indicators */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round((occupancy / 50) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Capacity Used</div>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-green-50 to-green-100">
                <div className="text-2xl font-bold text-green-600">
                  {50 - occupancy}
                </div>
                <div className="text-sm text-gray-600">Available Spots</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sensor Controls */}
        <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-4xl mx-auto border border-gray-100">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Sensor Controls
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <button
              onClick={() => handleSensorTrigger("A")}
              className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold">A</span>
                </div>
                <div className="text-left">
                  <div className="text-xl">Trigger Sensor A</div>
                  <div className="text-sm opacity-90">Entry/Exit Point A</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleSensorTrigger("B")}
              className="group bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold">B</span>
                </div>
                <div className="text-left">
                  <div className="text-xl">Trigger Sensor B</div>
                  <div className="text-sm opacity-90">Entry/Exit Point B</div>
                </div>
              </div>
            </button>
          </div>

          {/* Instructions */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
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
              How It Works
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="flex items-center p-3 bg-white rounded-xl">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mr-3 font-bold">
                  →
                </div>
                <div>
                  <div className="font-semibold">Entry Sequence</div>
                  <div className="text-gray-500">
                    Trigger A → B to add person
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
                    Trigger B → A to remove person
                  </div>
                </div>
              </div>
            </div>
            {lastSensor && (
              <div className="mt-4 p-3 bg-yellow-100 border border-yellow-200 rounded-xl">
                <p className="text-sm text-yellow-800">
                  <span className="font-semibold">
                    Waiting for next sensor:
                  </span>{" "}
                  Last triggered sensor was{" "}
                  <span className="font-bold">{lastSensor}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
