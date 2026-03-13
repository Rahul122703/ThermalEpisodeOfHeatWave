from flask import Flask, jsonify
from flask_cors import CORS

from routes.k2_west_winter import west_winter_bp
from routes.k2_west_premonsoon import west_premonsoon_bp
from routes.k2_west_monsoon import west_monsoon_bp
from routes.k2_west_postmonsoon import west_postmonsoon_bp
from routes.k2_north_monsoon import north_monsoon_bp
from routes.k2_north_postmonsoon import north_postmonsoon_bp

app = Flask(__name__)

CORS(app, origins=["http://localhost:5173","https://pyrkheatwave.vercel.app"])

@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "status": "running",
        "message": "Weather Forecast API is active",
        "available_endpoints": [
            "/west-winter/predict",
            "/west-premonsoon/predict",
            "/west-monsoon/predict",
            "/west-postmonsoon/predict",
            "/north-monsoon/predict",
            "/north-postmonsoon/predict"
        ]
    })


# register blueprints
app.register_blueprint(west_winter_bp)
app.register_blueprint(west_premonsoon_bp)
app.register_blueprint(west_monsoon_bp)
app.register_blueprint(west_postmonsoon_bp)
app.register_blueprint(north_monsoon_bp)
app.register_blueprint(north_postmonsoon_bp)

@app.errorhandler(404)
def not_found(e):
    return jsonify({
        "error": "Endpoint not found",
        "hint": "Check '/' for available endpoints"
    }), 404


if __name__ == "__main__":
    app.run(debug=True)