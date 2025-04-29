"use client";

import React, { useState } from "react"; // Ensure React and useState are imported
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const data = [
  { name: ">80 km/day", value: 30 },
  { name: "40-80 km/day", value: 80 },
  { name: "20-40 km/day", value: 150 },
  { name: "0-20 km/day", value: 200 },
];

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#FF4D4F"];

export default function DonutChartWithKMSegments({ runKm }) {
  const totalDrivers = runKm.reduce((acc, cur) => acc + cur.value, 0);

  // Hover state to track the active segment
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setActiveIndex(index); // Set the active segment index on hover
  };

  const handleMouseLeave = () => {
    setActiveIndex(null); // Reset the active segment index when hover leaves
  };

  return (
    <div className="w-full flex flex-col md:flex-row bg-white rounded-xl shadow-md p-4 md:p-6 items-center md:items-start justify-between">
      {/* Left Side - Text Details */}
      <div className="md:w-1/2 w-full mb-6 ml-6 mt-4 md:mb-0">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Driver Distance Distribution
        </h2>
        <p className="text-gray-500">
          <span className="font-medium text-black">{totalDrivers}</span> drivers
          categorized by their daily driving distance.
        </p>
        <ul className="space-y-1.5 text-sm text-gray-600 mt-10">
          {runKm.map((item, idx) => (
            <li key={idx} className="flex items-center">
              <span
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: COLORS[idx] }}
              ></span>
              {item.name}:{" "}
              <span className="ml-1 font-medium text-black">{item.value}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side - Donut Chart */}
      <div className="md:w-1/2 w-full h-64 mt-8">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={runKm}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {runKm.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]} // Change color on hover
                  onMouseEnter={() => handleMouseEnter(index)} // Handle hover
                  onMouseLeave={handleMouseLeave} // Handle hover leave
                />
              ))}
            </Pie>
            {/* Tooltip - Shows data on hover */}
            <Tooltip
              content={({ payload }) => {
                if (payload && payload.length) {
                  const { name, value } = payload[0].payload;
                  return (
                    <div className="p-2 bg-white border rounded shadow">
                      <strong>{name}</strong>
                      <div>{`Drivers: ${value}`}</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            {/* Optional Legend */}
            {/* <Legend verticalAlign="bottom" height={36} /> */}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
