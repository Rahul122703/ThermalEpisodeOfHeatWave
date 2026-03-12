from flask import Flask, jsonify
from tensorflow.keras.models import load_model
import numpy as np
import io

app = Flask(__name__)

# load model once when server starts
model = load_model("k2_west_pre_monsoon.h5", compile=False)


@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "message": "API is running",
        "available_endpoints": [
            "/summary",
            "/west-premonsoon"
        ]
    })


@app.route("/summary", methods=["GET"])
def model_summary():
    stream = io.StringIO()

    model.summary()
    model.summary(print_fn=lambda x: stream.write(x + "\n"))
    summary_text = stream.getvalue()

    return jsonify({
        "input_shape": model.input_shape,
        "output_shape": model.output_shape,
        "summary": summary_text
    })


@app.route("/west-premonsoon", methods=["GET"])
def west_premonsoon_prediction():

    # internal dummy input (45 days × 3 features)
    sample_input = np.random.rand(45, 3)

    sample_input = sample_input.reshape(1, 45, 3)

    prediction = model.predict(sample_input)

    return jsonify({
        "forecast_next_7_days": prediction.tolist()[0]
    })


# handle all unknown routes
@app.errorhandler(404)
def route_not_found(e):
    return jsonify({
        "error": {
            "code": 404,
            "message": "Endpoint does not exist",
            "available_endpoints": [
                "/",
                "/summary",
                "/west-premonsoon"
            ]
        }
    }), 


if __name__ == "__main__":
    app.run(debug=True)