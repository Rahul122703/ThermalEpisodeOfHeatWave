from flask import Blueprint, jsonify
import numpy as np
import io
import os

from services.model_loader import get_model

north_postmonsoon_bp = Blueprint(
    "north_postmonsoon",
    __name__,
    url_prefix="/north-postmonsoon"
)
# absolute path to model
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "k2_north_postmonsoon.h5")


def get_model_instance():
    return get_model(MODEL_PATH)


@north_postmonsoon_bp.route("/summary", methods=["GET"])
def model_summary():

    model = get_model_instance()

    stream = io.StringIO()
    model.summary(print_fn=lambda x: stream.write(x + "\n"))

    return jsonify({
        "model": "north-premonsoon",
        "input_shape": model.input_shape,
        "output_shape": model.output_shape,
        "summary": stream.getvalue()
    })


@north_postmonsoon_bp.route("/predict", methods=["GET"])
def predict():

    model = get_model_instance()

    sample_input = np.random.rand(45, 3)
    sample_input = sample_input.reshape(1, 45, 3)

    prediction = model.predict(sample_input)

    return jsonify({
        "model": "north-premonsoon",
        "forecast_next_7_days": prediction.tolist()[0]
    })