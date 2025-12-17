import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Purchase({ data }) {
  const dataChart = data?.flatMap((purchase) =>
    purchase?.purchase_product?.map((item) => ({
      name: item?.product?.name,
      total: Number(item?.qty) * Number(item?.cost),
    }))
  );

  return (
    <div className="w-full bg-white shadow-md rounded-2xl p-5 border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Purchase Overview
      </h2>

      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dataChart}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
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
            <Bar
              dataKey="total"
              fill="#6366F1"
              radius={[6, 6, 0, 0]}
              name="Purchase"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
