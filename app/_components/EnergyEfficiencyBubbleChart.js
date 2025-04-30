"use client";

import {
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Scatter,
  Legend,
  ReferenceLine,
} from "recharts";

const data = [
  { km: 500, energy: 100, efficiency: "good" },
  { km: 800, energy: 110, efficiency: "average" },
  { km: 1500, energy: 90, efficiency: "bad" },
  { km: 1000, energy: 150, efficiency: "good" },
  { km: 1800, energy: 160, efficiency: "average" },
  { km: 2500, energy: 100, efficiency: "bad" },
];

export default function EnergyEfficiencyBubbleChart({ energy }) {
  const goodEfficiency = energy.filter((d) => d.efficiency === "#00C853");
  const avgEfficiency = energy.filter((d) => d.efficiency === "#2962FF");
  const badEfficiency = energy.filter((d) => d.efficiency === "#FFD600");

  console.log(
    energy.length,
    goodEfficiency.length,
    avgEfficiency.length,
    badEfficiency.length
  );

  return (
    <div className="w-full h-[400px] md:h-[500px] bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2 ml-4">
        Energy Delivered
      </h2>
      <ResponsiveContainer width="90%" height="90%">
        <ScatterChart
          margin={{ top: 40, right: 10, bottom: 40, left: 50 }} // gap around chart
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="km"
            name="Distance"
            unit="km"
            type="number"
            tick={{ fontSize: 12 }} // 👈 change this value to control size
            label={{
              value: "Kms Travelled",
              position: "insideBottom",
              offset: -20, // gap between axis and label
              style: { fill: "#444", fontSize: 12 },
            }}
          />
          <YAxis
            dataKey="energy"
            name="Energy Delivered"
            unit="kWh"
            type="number"
            tick={{ fontSize: 12 }} // 👈 change this value to control size
            label={{
              value: "Energy Delivered (kWh)",
              angle: -90,
              offset: -20, // <-- Increase this for more spacing
              style: { fill: "#444", fontSize: 13 },
              position: "insideLeft",
              dy: 65,
            }}
          />
          <ZAxis dataKey="size" range={[60, 60]} name="Battery Size" />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            formatter={(value, name) => [`${value}`, name]}
          />
          {/* <Legend
            verticalAlign="bottom"
            wrapperStyle={{ marginBottom: -40, fontSize: 12 }}
          /> */}
          <ReferenceLine
            segment={[
              { x: 0, y: 0 },
              { x: 3000, y: 240 },
            ]}
            stroke="#d32f2f"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
          <Scatter
            name="Good Efficiency"
            data={goodEfficiency}
            fill="#B9F6CA" // light green fill
            stroke="#00C853" // dark green outline
            shape="circle"
          />
          <Scatter
            name="Average Efficiency"
            data={avgEfficiency}
            fill="#BBDEFB" // light blue fill
            stroke="#2962FF" // dark blue outline
            shape="circle"
          />
          <Scatter
            name="Poor Efficiency"
            data={badEfficiency}
            fill="#FFF9C4" // light yellow fill
            stroke="#FFD600" // dark yellow outline
            shape="circle"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
