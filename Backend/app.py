from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np

app = Flask(__name__)
CORS(app)

# Load all models at startup
models = {
    'pre_monsoon': tf.keras.models.load_model('k2_west_pre_monsoon.h5'),
    'winter': tf.keras.models.load_model('k2_west_winter.h5')
}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        season = data.get('season', 'pre_monsoon')
        input_data = np.array(data['input']).reshape(1, -1)
        
        # Select model based on season
        model = models.get(season)
        if not model:
            return jsonify({'error': 'Invalid season'}), 400
        
        # Make prediction
        prediction = model.predict(input_data)
        
        return jsonify({
            'season': season,
            'prediction': float(prediction[0][0]),
            'heatwave_probability': float(prediction[0][0] * 100),
            'risk_level': get_risk_level(prediction[0][0])
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_risk_level(probability):
    if probability > 0.8:
        return 'Very High'
    elif probability > 0.6:
        return 'High'
    elif probability > 0.4:
        return 'Moderate'
    elif probability > 0.2:
        return 'Low'
    else:
        return 'Very Low'

@app.route('/available-seasons', methods=['GET'])
def get_seasons():
    return jsonify({
        'seasons': list(models.keys())
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)