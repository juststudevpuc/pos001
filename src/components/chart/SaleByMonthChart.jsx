import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function SaleByMonthChart({ data }) {
  return (
    <div className="w-full bg-white shadow-md rounded-2xl p-5 border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Monthly Sales Overview
      </h2>

      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis
              dataKey="title"
              tick={{ fill: "#6b7280" }}
              axisLine={{ stroke: "#d1d5db" }}
            />

            <YAxis
              tick={{ fill: "#6b7280" }}
              axisLine={{ stroke: "#d1d5db" }}
            />

            <Tooltip
              formatter={(value) => `$${value?.toLocaleString()}`}
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              }}
            />

            <Line
              type="monotone"
              dataKey="total"
              stroke="#6366F1"
              strokeWidth={4}
              dot={{ r: 5, strokeWidth: 2 }}
              activeDot={{ r: 7 }}
              name="Total Sale"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
