import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import PredictChart from '../components/PredictChart.js';

const schema = Yup.object().shape({
  Pregnancies: Yup.number().min(0).max(20).required('Required'),
  Glucose: Yup.number().min(50).max(300).required('Required'),
  BloodPressure: Yup.number().min(30).max(200).required('Required'),
  SkinThickness: Yup.number().min(0).max(100).required('Required'),
  Insulin: Yup.number().min(0).max(1000).required('Required'),
  BMI: Yup.number().min(10).max(70).required('Required'),
  DiabetesPedigreeFunction: Yup.number().min(0).max(2.5).required('Required'),
  Age: Yup.number().min(10).max(120).required('Required'),
});

const featureTooltips = {
  Pregnancies: "Number of times the patient has been pregnant.",
  Glucose: "Plasma glucose concentration (mg/dL).",
  BloodPressure: "Diastolic blood pressure (mm Hg).",
  SkinThickness: "Skinfold thickness (mm).",
  Insulin: "2-Hour serum insulin (mu U/ml).",
  BMI: "Body mass index (weight in kg / (height in m)^2).",
  DiabetesPedigreeFunction: "Diabetes likelihood based on family history.",
  Age: "Age of the patient in years.",
};

function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const [result, setResult] = React.useState(null);
  const [inputData, setInputData] = React.useState(null);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:5001/predict', data);
      setResult(res.data);
      setInputData({
        Pregnancies: data.Pregnancies,
        Glucose: data.Glucose,
        BloodPressure: data.BloodPressure,
        SkinThickness: data.SkinThickness,
        Insulin: data.Insulin,
        BMI: data.BMI,
        DiabetesPedigreeFunction: data.DiabetesPedigreeFunction,
        Age: data.Age
      });
    } catch {
      alert('Prediction failed');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      <Particles
        id="tsparticles"
        className="absolute inset-0 z-0"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "#f9fafb" } },
          particles: {
            number: { value: 60 },
            color: { value: "#6366f1" },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
            links: {
              enable: true,
              distance: 150,
              color: "#6366f1",
              opacity: 0.5,
              width: 1,
            },
          },
        }}
      />

      <div className="relative bg-white z-10 rounded-2xl shadow-xl p-8 max-w-2xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-700">Health Risk Predictor</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.keys(schema.fields).map((field) => (
            <div key={field} className="relative group">
              <input
                {...register(field)}
                placeholder={field}
                type="number"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
              />
              <div className="absolute bottom-full left-0 mb-1 hidden group-hover:block text-xs bg-black text-white p-2 rounded w-64 shadow z-50">
                {featureTooltips[field]}
              </div>
              {errors[field] && <p className="text-sm text-red-600 mt-1">{errors[field].message}</p>}
            </div>
          ))}
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700"
            >
              Predict
            </button>
          </div>
        </form>

        {result && (
          <div className="border-t pt-4 text-center space-y-3">
            <p className="text-xl font-semibold">
              Risk:{" "}
              <span className={result.risk === 'High' ? 'text-red-600' : 'text-green-600'}>
                {result.risk}
              </span>
            </p>
            <p className="text-md text-gray-700">
              Confidence: {Math.round(result.confidence * 100)}%
            </p>

            {result.recommendations?.length > 0 && (
              <div className="text-left">
                <h3 className="text-lg font-bold text-indigo-700 mb-2">Health Recommendations:</h3>
                <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                  {result.recommendations.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* 👇 Render chart visualization */}
        {inputData && <PredictChart inputData={inputData} />}
      </div>
    </div>
  );
}

export default Home;
