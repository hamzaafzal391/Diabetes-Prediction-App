import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, Label
} from 'recharts';

const colors = [
  "#4f46e5", "#6366f1", "#818cf8", "#a5b4fc",
  "#c7d2fe", "#e0e7ff", "#dbeafe", "#bfdbfe"
];

function PredictChart({ inputData }) {
  if (!inputData) return null;

  const data = Object.entries(inputData).map(([key, value], index) => ({
    name: key,
    value: Number(value),
    fill: colors[index % colors.length],
  }));

  return (
    <div className="mt-6 px-4">
      <h3 className="text-lg font-bold text-indigo-700 mb-4 text-center">Input Feature Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          barCategoryGap="25%"
          margin={{ top: 10, right: 30, left: 10, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            interval={0}
            angle={-30}
            textAnchor="end"
            tick={{ fontSize: 12 }}
          />
          <YAxis tick={{ fontSize: 12 }}>
            <Label
              value="Feature Value"
              angle={-90}
              position="insideLeft"
              offset={10}
              style={{ textAnchor: 'middle', fontSize: 12 }}
            />
          </YAxis>
          <Tooltip contentStyle={{ fontSize: 12 }} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PredictChart;
