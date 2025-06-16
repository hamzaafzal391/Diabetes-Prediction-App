import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center min-h-screen flex flex-col items-center justify-center text-white px-6 py-20"
        style={{ backgroundImage: "url('/img/hero-diabetes-flatlay.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

        <div className="relative z-10 max-w-2xl text-center space-y-6">
          <h1 className="text-4xl font-extrabold">👋 Welcome to Health Risk Predictor</h1>
          <p className="text-lg">
            This smart tool helps you check your diabetes risk using your health data.
            Quick, easy, and informative — for a healthier future.
          </p>
          <Link to="/predict">
            <button className="mt-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-md transition">
              Predict My Diabetes Risk
            </button>
          </Link>
        </div>
      </div>

      {/* Diabetes Info Section */}
      <section className="bg-gray-100 px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">Understanding Diabetes</h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
          Diabetes is a chronic health condition that affects how your body converts food into energy.
          It results in elevated blood glucose levels, which can damage the heart, kidneys, nerves, and eyes over time.
          Many people with diabetes are unaware of their risk until complications arise.
          <br /><br />
          That’s why early detection is crucial. By evaluating a few health indicators like glucose levels,
          blood pressure, insulin, and BMI, this tool provides you with an instant risk assessment.
          Use this insight to take control of your health today — because prevention starts with awareness.
        </p>
      </section>

      {/* About Image Section */}
      <section className="bg-white py-12 px-4 flex justify-center">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl w-full flex flex-col items-center">
          <img
            src="/img/about.jpg"
            alt="About Diabetes"
            className="rounded-lg shadow-md max-w-full h-auto"
          />
          <p className="mt-6 text-center text-gray-700 text-lg max-w-2xl">
            Our mission is to empower you with early health insights through accessible AI tools.
            We use real-world health data to provide clear predictions and lifestyle guidance —
            because staying informed is the first step toward better health.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Landing;
