import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell,
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, ResponsiveContainer, Legend
} from 'recharts';

const COLORS = ['#f87171', '#34d399'];

const getAgeGroup = (age) => {
  if (age < 30) return '20-29';
  if (age < 40) return '30-39';
  if (age < 50) return '40-49';
  if (age < 60) return '50-59';
  return '60+';
};

function Analytics() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/history')
      .then(res => setHistory(res.data))
      .catch(() => alert('Failed to load history'));
  }, []);

  const riskData = [
    { name: 'High Risk', value: history.filter(h => h.risk === 'High').length },
    { name: 'Low Risk', value: history.filter(h => h.risk === 'Low').length },
  ];

  const scatterData = history.map(h => ({ glucose: h.glucose, bmi: h.bmi }));

  const ageGroupData = Object.values(
    history.reduce((acc, curr) => {
      const group = getAgeGroup(curr.age);
      acc[group] = acc[group] || { group, High: 0, Low: 0 };
      acc[group][curr.risk] += 1;
      return acc;
    }, {})
  );

  return (
    <div className="p-6 space-y-12">
      <h2 className="text-3xl font-bold text-center">Prediction Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-center">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={riskData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {riskData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Scatter Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-center">Glucose vs BMI</h3>
          <ResponsiveContainer width="100%" height={250}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="glucose" name="Glucose" />
              <YAxis dataKey="bmi" name="BMI" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={scatterData} fill="#6366f1" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-center">Risk Count by Age Group</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ageGroupData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="group" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="High" stackId="a" fill="#f87171" />
              <Bar dataKey="Low" stackId="a" fill="#34d399" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analytics;