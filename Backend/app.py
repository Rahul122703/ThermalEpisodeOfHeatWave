from flask import Flask, jsonify
import numpy as np
from keras.models import load_model

app = Flask(__name__)

pre_monsoon_model = load_model("k2_west_pre_monsoon.h5", compile=False)

@app.route("/")
def home():
    return {"message": "API running"}

@app.route("/predict/pre_monsoon")
def predict_pre_monsoon():

    sample = np.zeros((1,45,3))   # correct shape
    print("sample")
    print(sample)
    prediction = pre_monsoon_model.predict(sample)

    return jsonify({
        "prediction": prediction.tolist()
    })

if __name__ == "__main__":
    app.run(debug=True)