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
            label={{ value: "SOH(%)", angle: -90, position: "insideLeft" }}
          />
          <ZAxis dataKey="size" range={[50, 50]} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            formatter={(value, name) => [`${value}`, name.toUpperCase()]}
          />
          <Scatter
            name="Good Batteries"
            data={soh.filter((d) => d.type === "#00C853")}
            fill="#B9F6CA"
            stroke="#00C853"
            // strokeWidth={2}
            shape="circle"
          />

          <Scatter
            name="Avg. Batteries"
            data={soh.filter((d) => d.type === "#FFD600")}
            fill="#FFF9C4"
            stroke="#FFD600"
            // strokeWidth={2}
            shape="circle"
          />

          <Scatter
            name="Poor Batteries"
            data={soh.filter((d) => d.type === "#D50000")}
            fill="#FFCDD2"
            stroke="#D50000"
            // strokeWidth={2}
            shape="circle"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
