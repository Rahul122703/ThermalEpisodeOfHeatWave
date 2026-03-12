from flask import Flask, jsonify

from routes.k2_west_winter import west_winter_bp
from routes.k2_west_premonsoon import west_premonsoon_bp

app = Flask(__name__)


@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "status": "running",
        "message": "Weather Forecast API is active",
        "available_endpoints": [
            "/west-winter/summary",
            "/west-winter/predict",
            "/west-premonsoon/summary",
            "/west-premonsoon/predict"
        ]
    })


# register blueprints
app.register_blueprint(west_winter_bp)
app.register_blueprint(west_premonsoon_bp)


@app.errorhandler(404)
def not_found(e):
    return jsonify({
        "error": "Endpoint not found",
        "hint": "Check '/' for available endpoints"
    }), 404


if __name__ == "__main__":
    app.run(debug=True)