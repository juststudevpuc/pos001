import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function PurchaseByMonthChart({ data }) {
  return (
    <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Monthly Purchase Summary
      </h2>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />

            <XAxis
              dataKey="title"
              tick={{ fill: "#4b5563" }}
              axisLine={{ stroke: "#d1d5db" }}
            />
            <YAxis
              tick={{ fill: "#4b5563" }}
              axisLine={{ stroke: "#d1d5db" }}
            />

            <Tooltip
              formatter={(value) => `$${value?.toLocaleString()}`}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                backgroundColor: "#ffffff",
              }}
            />

            <Bar
              dataKey="total"
              fill="url(#colorTotal)"
              radius={[8, 8, 0, 0]}
              name="Total Purchase"
            />

            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.5} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
