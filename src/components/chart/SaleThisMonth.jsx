import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function SaleThisMonth({ data }) {
  // Add default values to prevent undefined errors
  const total = data?.total || 0;
  const totalOrder = data?.total_order || 0;
  const avg = totalOrder ? total / totalOrder : 0;

  const dataChart = [
    { name: "Total Sale", value: total },
    { name: "Total Order", value: totalOrder },
    { name: "Average", value: avg }, // Fixed spelling: "Average" not "Avarage"
  ];

  const colors = ["#005461", "#FF9013", "#00B7B5"];

  // Custom tooltip to format currency
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-sm">Value: ${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white border rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Sales This Month</h2>
      <ResponsiveContainer width={400} height={300}>
        <PieChart>
          <Pie
            nameKey="name"
            dataKey="value"
            data={dataChart}
            cy="50%"
            cx="50%"
            outerRadius={100}
            label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
          >
            {dataChart.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
