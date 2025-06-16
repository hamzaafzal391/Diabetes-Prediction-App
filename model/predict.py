from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# Persistent SQLite DB
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///predictions.db'
db = SQLAlchemy(app)

# Load model and scaler
model = joblib.load("diabetes_model.pkl")
scaler = joblib.load("scaler.pkl")

# DB schema
class Prediction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pregnancies = db.Column(db.Integer)
    glucose = db.Column(db.Float)
    blood_pressure = db.Column(db.Float)
    skin_thickness = db.Column(db.Float)
    insulin = db.Column(db.Float)
    bmi = db.Column(db.Float)
    dpf = db.Column(db.Float)
    age = db.Column(db.Integer)
    risk = db.Column(db.String(10))
    confidence = db.Column(db.Float)

def generate_recommendations(input_data, prediction):
    recommendations = []
    if input_data['BMI'] > 30:
        recommendations.append("Maintain a healthy weight through diet and regular exercise.")
    if input_data['Glucose'] > 140:
        recommendations.append("Monitor blood sugar levels and reduce sugar intake.")
    if input_data['BloodPressure'] > 90:
        recommendations.append("Keep blood pressure in check with a low-sodium diet.")
    if input_data['Insulin'] > 200:
        recommendations.append("Consult a doctor to evaluate insulin levels.")
    if input_data['Age'] > 45:
        recommendations.append("Schedule regular checkups for diabetes and heart health.")
    if input_data['DiabetesPedigreeFunction'] > 1:
        recommendations.append("Genetic risk is high, stay proactive with lifestyle choices.")

    if not recommendations:
        if prediction == 1:
            recommendations.append("You're at high risk even with normal metrics. Please consult a healthcare professional for further testing.")
        else:
            recommendations.append("You're on the right track. Keep up the healthy lifestyle!")

    return recommendations

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    input_data = [
        data['Pregnancies'],
        data['Glucose'],
        data['BloodPressure'],
        data['SkinThickness'],
        data['Insulin'],
        data['BMI'],
        data['DiabetesPedigreeFunction'],
        data['Age']
    ]

    # Scale inputs
    features = scaler.transform([input_data])
    prediction = model.predict(features)[0]
    proba = model.predict_proba(features)[0][int(prediction)]

    new_entry = Prediction(
        pregnancies=data['Pregnancies'],
        glucose=data['Glucose'],
        blood_pressure=data['BloodPressure'],
        skin_thickness=data['SkinThickness'],
        insulin=data['Insulin'],
        bmi=data['BMI'],
        dpf=data['DiabetesPedigreeFunction'],
        age=data['Age'],
        risk='High' if prediction == 1 else 'Low',
        confidence=float(proba)
    )
    db.session.add(new_entry)
    db.session.commit()

    result = {
        'risk': 'High' if prediction == 1 else 'Low',
        'confidence': float(proba),
        'recommendations': generate_recommendations(data, prediction),
        'input_data': input_data
    }
    return jsonify(result)

@app.route('/history', methods=['GET'])
def get_history():
    predictions = Prediction.query.order_by(Prediction.id.desc()).limit(20).all()
    return jsonify([
        {
            'glucose': p.glucose,
            'bmi': p.bmi,
            'age': p.age,
            'risk': p.risk,
            'confidence': p.confidence
        } for p in predictions
    ])

@app.route('/metrics', methods=['GET'])
def metrics():
    return jsonify({
        'accuracy': 0.7403,
        'precision': 0.6316,
        'recall': 0.6545,
        'f1_score': 0.6429
    })

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5001)
