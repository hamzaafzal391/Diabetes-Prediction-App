import React from 'react';

function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg">
        <h1 className="text-2xl font-bold text-indigo-600 mb-4">About Health Risk Predictor</h1>
        <p className="text-gray-700">
          This app uses a machine learning model trained on the PIMA Diabetes dataset to predict the risk of diabetes based on user input. It also provides recommendations to promote a healthier lifestyle.
        </p>
      </div>
    </div>
  );
}

export default About;