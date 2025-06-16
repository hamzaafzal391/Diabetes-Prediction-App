🧠 Problem & Objective

 The goal was to allow users to enter common medical indicators and instantly assess their diabetes risk — while also giving health tips and visual insights.



🏗️ How I Built It

1️⃣ Model Training

 Used the PIMA Diabetes dataset, cleaned and scaled the data, applied hyperparameter tuning, selected best parameters, handles imbalances, trained an XGBoost classifier, and saved the model using joblib.

2️⃣ Backend – Flask

Built a REST API with Flask that:

Accepts JSON input

Loads the model & scaler

Returns risk prediction and confidence

Generates personalized health tips

3️⃣ Frontend – React

 Built with React.js + Tailwind CSS, the UI features:

A clean prediction form with React Hook Form + Yup

Feature tooltips (e.g., "Insulin = blood insulin level")

A Landing Page that introduces diabetes and the app

Displays prediction result + confidence + tips

4️⃣ Analytics Dashboard

 Added an Analytics Page using Recharts to show:

🟢 Risk Distribution (Pie Chart)

💠 Glucose vs BMI (Scatter Plot)

📊 Risk by Age Group (Bar Chart)

5️⃣ Database – SQLite



 Integrated a lightweight SQLite DB to:

Store all predictions

Power the analytics dashboard

Track insights across sessions

🧠 What I Learned

 This project helped me connect ML, Flask, React, and SQLite into a cohesive product. It deepened my understanding of API communication, form validation, and persistent state management.

🔜 What’s Next?

🎨 Improve UI with HTML/CSS templates

🔐 Add user authentication

🚀 Deploy (likely Flask + Vercel or Render)

🧠 Expand to other health risk predictors

🛠️ Tech Stack

       Backend: Python, Flask, XGBoost, Scikit-learn, Pandas

       Frontend: React, Tailwind CSS, Recharts, Axios, React Hook Form

       Database: SQLite

       Other Tools: VS Code, joblib, Yup, CORS
