import React, { useEffect, useState } from 'react';
import axios from 'axios';

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/history')
      .then(res => setHistory(res.data))
      .catch(() => alert('Failed to load history'));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Prediction History</h2>
      <table className="w-full border text-sm text-left">
        <thead className="bg-gray-200">
          <tr>
            <th>Glucose</th><th>BMI</th><th>Age</th><th>Risk</th><th>Confidence</th>
          </tr>
        </thead>
        <tbody>
          {history.map((row, idx) => (
            <tr key={idx} className="border-t">
              <td>{row.glucose}</td>
              <td>{row.bmi}</td>
              <td>{row.age}</td>
              <td className={row.risk === 'High' ? 'text-red-500' : 'text-green-600'}>{row.risk}</td>
              <td>{Math.round(row.confidence * 100)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
