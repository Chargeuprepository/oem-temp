// components/SOHVsKmChart.jsx
"use client";
import {
  ResponsiveContainer,
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Scatter,
  Tooltip,
  ZAxis,
} from "recharts";

const data = [
  { km: 1200, soh: 85, good: true },
  { km: 4000, soh: 95, good: true },
  { km: 8000, soh: 72, good: false },
  { km: 10000, soh: 65, good: false },
  { km: 15000, soh: 90, good: true },
  { km: 35000, soh: 85, good: true },
  { km: 5000, soh: 70, good: false },
  { km: 12000, soh: 92, good: true },
  { km: 20000, soh: 80, good: false },
  { km: 11000, soh: 75, good: false },
  { km: 3000, soh: 88, good: true },
  { km: 25000, soh: 78, good: false },
  { km: 22000, soh: 85, good: true },
  { km: 18000, soh: 91, good: true },
  { km: 16000, soh: 76, good: false },
  { km: 13000, soh: 82, good: true },
  { km: 24000, soh: 84, good: true },
  { km: 500, soh: 90, good: true },
  { km: 30000, soh: 60, good: false },
  { km: 45000, soh: 65, good: false },
  { km: 5500, soh: 80, good: true },
  { km: 8000, soh: 89, good: true },
  { km: 3000, soh: 87, good: true },
  { km: 2000, soh: 91, good: true },
  { km: 3500, soh: 78, good: false },
  { km: 4200, soh: 85, good: true },
  { km: 1800, soh: 76, good: false },
  { km: 7000, soh: 70, good: false },
  { km: 9000, soh: 92, good: true },
  { km: 12000, soh: 83, good: true },
  { km: 18000, soh: 74, good: false },
  { km: 11000, soh: 86, good: true },
  { km: 9500, soh: 90, good: true },
  { km: 15000, soh: 79, good: false },
  { km: 20000, soh: 80, good: false },
  { km: 11000, soh: 75, good: false },
  { km: 3000, soh: 88, good: true },
  { km: 25000, soh: 78, good: false },
  { km: 22000, soh: 85, good: true },
  { km: 18000, soh: 91, good: true },
  { km: 16000, soh: 76, good: false },
  { km: 13000, soh: 82, good: true },
  { km: 24000, soh: 84, good: true },
  { km: 500, soh: 90, good: true },
  { km: 30000, soh: 60, good: false },
  { km: 45000, soh: 65, good: false },
  { km: 5500, soh: 80, good: true },
  { km: 8000, soh: 89, good: true },
  { km: 3000, soh: 87, good: true },
  { km: 2000, soh: 91, good: true },
  { km: 3500, soh: 78, good: false },
  { km: 4200, soh: 85, good: true },
  { km: 1800, soh: 76, good: false },
  { km: 7000, soh: 70, good: false },
  { km: 9000, soh: 92, good: true },
  { km: 12000, soh: 83, good: true },
  { km: 18000, soh: 74, good: false },
  { km: 11000, soh: 86, good: true },
  { km: 9500, soh: 90, good: true },
  { km: 15000, soh: 79, good: false },
  { km: 20000, soh: 80, good: false },
  { km: 11000, soh: 75, good: false },
  { km: 3000, soh: 88, good: true },
  { km: 25000, soh: 78, good: false },
  { km: 22000, soh: 85, good: true },
  { km: 18000, soh: 91, good: true },
  { km: 16000, soh: 76, good: false },
  { km: 13000, soh: 82, good: true },
  { km: 24000, soh: 84, good: true },
  { km: 500, soh: 90, good: true },
  { km: 30000, soh: 60, good: false },
  { km: 45000, soh: 65, good: false },
  { km: 5500, soh: 80, good: true },
  { km: 8000, soh: 89, good: true },
  { km: 3000, soh: 87, good: true },
  { km: 2000, soh: 91, good: true },
  { km: 3500, soh: 78, good: false },
  { km: 4200, soh: 85, good: true },
  { km: 1800, soh: 76, good: false },
  { km: 7000, soh: 70, good: false },
  { km: 9000, soh: 92, good: true },
  { km: 12000, soh: 83, good: true },
  { km: 18000, soh: 74, good: false },
  { km: 11000, soh: 86, good: true },
  { km: 9500, soh: 90, good: true },
];

export default function SOHVsKmChart({ soh }) {
  return (
    <div className="rounded-xl p-4 shadow">
      <h2 className="text-center text-lg font-semibold text-blue-800 mb-2">
        SOH Vs Km
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
          <CartesianGrid />
          <XAxis
            dataKey="km"
            name="Kms Travelled"
            unit=""
            type="number"
            label={{
              value: "Kms Travelled",
              offset: 0, // gap between axis and label
              position: "bottom",
            }}
          />
          <YAxis
            dataKey="soh"
            name="SOH"
            domain={[40, 100]}
            label={{ value: "SOH", angle: -90, position: "insideLeft" }}
          />
          <ZAxis dataKey="size" range={[30, 30]} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            formatter={(value, name) => [`${value}`, name.toUpperCase()]}
          />
          <Scatter
            name="Good Batteries"
            data={soh.filter((d) => d.type === "#00C853")}
            fill="#00C853"
            shape="circle"
          />
          <Scatter
            name="Avg. Batteries"
            data={soh.filter((d) => !d.type === "FFD600")}
            fill="#FFD600"
            shape="circle"
          />
          <Scatter
            name="Old Batteries"
            data={soh.filter((d) => !d.type === "D50000")}
            fill="#D50000"
            shape="circle"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
