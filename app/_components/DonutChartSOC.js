"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "SOC < 5%", value: 30 },
  { name: "SOC 5–10%", value: 60 },
  { name: "SOC 10–20%", value: 120 },
];

const COLORS = [
  "rgba(255, 77, 79, 0.3)",
  "rgba(255, 77, 79, 0.6)",
  "rgba(255, 77, 79, 1)",
];

export default function DonutChartSOC({ soc }) {
  const total = soc.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <div className="w-full flex flex-col md:flex-row bg-white rounded-xl shadow-md p-4 md:p-6 items-center md:items-start justify-between">
      {/* Chart on the Left */}
      <div className="md:w-1/2 w-full h-64 mt-16">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={soc}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {soc.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Text Details on the Right */}
      <div className="md:w-1/2 w-full mt-28 md:pl-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          SOC Distribution
          <span className="text-base text-gray-600"> ({"<"} 20%)</span>
        </h2>
        <p className="text-gray-500 mb-4">
          <span className="font-medium text-black">{total}</span> batteries have
          SOC below 20%.
        </p>
        <ul className="space-y-2 text-sm text-gray-700">
          {soc.map((item, idx) => (
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
    </div>
  );
}
