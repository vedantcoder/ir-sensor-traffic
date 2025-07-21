"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [gymOccupancy, setGymOccupancy] = useState(0);
  const [badmintonTotal, setBadmintonTotal] = useState(0);
  const [court1, setCourt1] = useState(false);
  const [court2, setCourt2] = useState(false);

  const fetchGym = async () => {
    const res = await fetch("/api/gym");
    const data = await res.json();
    setGymOccupancy(data.occupancy);
  };

  const fetchBadminton = async () => {
    const res = await fetch("/api/badminton");
    const data = await res.json();
    setBadmintonTotal(data.total);
    setCourt1(data.court1);
    setCourt2(data.court2);
  };

  useEffect(() => {
    fetchGym();
    fetchBadminton();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Live Occupancy Tracker
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Monitor real-time facility usage and availability across campus
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Gym Card */}
          <Link href="/gym">
            <div className="group bg-white shadow-2xl rounded-3xl p-10 hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-50 to-red-100 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                    Gym
                  </h2>
                </div>
                <div className="space-y-3">
                  <p className="text-lg text-gray-600">Current Occupancy</p>
                  <div className="flex items-center">
                    <span className="text-4xl font-bold text-gray-900 mr-2">
                      {gymOccupancy}
                    </span>
                    <span className="text-lg text-gray-500">people</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min((gymOccupancy / 50) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500">Capacity: 50 people</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Badminton Card */}
          <Link href="/badminton">
            <div className="group bg-white shadow-2xl rounded-3xl p-10 hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-50 to-green-100 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                    Badminton
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-lg text-gray-600">Total Occupancy</p>
                    <div className="flex items-center">
                      <span className="text-3xl font-bold text-gray-900 mr-2">
                        {badmintonTotal}
                      </span>
                      <span className="text-lg text-gray-500">players</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Court 1
                      </p>
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                          court1
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-gray-100 text-gray-600 border border-gray-200"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            court1 ? "bg-green-500" : "bg-gray-400"
                          }`}
                        ></div>
                        {court1 ? "In Use" : "Available"}
                      </div>
                    </div>

                    <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Court 2
                      </p>
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                          court2
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-gray-100 text-gray-600 border border-gray-200"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            court2 ? "bg-green-500" : "bg-gray-400"
                          }`}
                        ></div>
                        {court2 ? "In Use" : "Available"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Summary */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Quick Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-2xl font-bold text-blue-600">
                {gymOccupancy + badmintonTotal}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Total Active Users
              </div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="text-2xl font-bold text-purple-600">
                {2 - (court1 ? 1 : 0) - (court2 ? 1 : 0)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Available Courts</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-green-50 to-green-100">
              <div className="text-2xl font-bold text-green-600">Live</div>
              <div className="text-sm text-gray-600 mt-1">Real-time Data</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
