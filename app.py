from flask import Flask, jsonify, request, send_from_directory, render_template, redirect, url_for, session
from pathlib import Path

app = Flask(__name__, static_folder="static", template_folder="templates")

# Simple secret key for demo session handling
app.secret_key = "krishi-ai-secret"


# ----- Dummy data and in-memory storage -----

BASE_DIR = Path(__file__).resolve().parent

# Simple crop dataset with suitability rules and economics
CROPS = [
    {
        "name": "Wheat",
        "soil_types": ["loam", "clay"],
        "seasons": ["rabi", "winter"],
        "rainfall_min": 300,
        "rainfall_max": 800,
        "temp_min": 10,
        "temp_max": 25,
        "yield_per_acre": 2.8,  # tons
        "price_per_ton": 22000,  # INR
        "cost_per_acre": 18000,
    },
    {
        "name": "Rice",
        "soil_types": ["clay", "silty"],
        "seasons": ["kharif", "monsoon"],
        "rainfall_min": 800,
        "rainfall_max": 2200,
        "temp_min": 20,
        "temp_max": 35,
        "yield_per_acre": 3.5,
        "price_per_ton": 18000,
        "cost_per_acre": 20000,
    },
    {
        "name": "Maize",
        "soil_types": ["loam", "sandy"],
        "seasons": ["kharif", "rabi", "summer"],
        "rainfall_min": 500,
        "rainfall_max": 1200,
        "temp_min": 18,
        "temp_max": 32,
        "yield_per_acre": 2.2,
        "price_per_ton": 17000,
        "cost_per_acre": 15000,
    },
    {
        "name": "Cotton",
        "soil_types": ["black", "loam"],
        "seasons": ["kharif", "summer"],
        "rainfall_min": 500,
        "rainfall_max": 900,
        "temp_min": 20,
        "temp_max": 35,
        "yield_per_acre": 1.2,
        "price_per_ton": 48000,
        "cost_per_acre": 22000,
    },
    {
        "name": "Groundnut",
        "soil_types": ["sandy", "loam"],
        "seasons": ["kharif", "rabi"],
        "rainfall_min": 500,
        "rainfall_max": 1000,
        "temp_min": 20,
        "temp_max": 30,
        "yield_per_acre": 1.4,
        "price_per_ton": 45000,
        "cost_per_acre": 19000,
    },
]

FERTILIZERS = [
    {"name": "Farm Yard Manure", "type": "organic", "toxicity": "low", "price_per_kg": 5},
    {"name": "Vermicompost", "type": "organic", "toxicity": "low", "price_per_kg": 12},
    {"name": "Neem Cake", "type": "organic", "toxicity": "low", "price_per_kg": 18},
    {"name": "Urea (46% N)", "type": "chemical", "toxicity": "medium", "price_per_kg": 7},
    {"name": "DAP (18-46-0)", "type": "chemical", "toxicity": "medium", "price_per_kg": 30},
    {"name": "MOP (0-0-60)", "type": "chemical", "toxicity": "medium", "price_per_kg": 20},
    {"name": "NPK 19-19-19", "type": "chemical", "toxicity": "high", "price_per_kg": 45},
    {"name": "Single Super Phosphate", "type": "chemical", "toxicity": "medium", "price_per_kg": 6},
    {"name": "Biofertilizer (Azospirillum)", "type": "organic", "toxicity": "low", "price_per_kg": 25},
    {"name": "Bone Meal", "type": "organic", "toxicity": "low", "price_per_kg": 22},
]

# In-memory user data (for demo only)
USERS = {}  # {username: password}
listings = []
user_history = {}


def record_recommendation(user, payload, result):
    if not user:
        return
    history = user_history.setdefault(user, {"recommendations": [], "listings": []})
    history["recommendations"].append({"input": payload, "result": result})


def record_listing(user, listing):
    if not user:
        return
    history = user_history.setdefault(user, {"recommendations": [], "listings": []})
    history["listings"].append(listing)


def calculate_crop_profit(crop, area_acres=1.0):
    gross = crop["yield_per_acre"] * area_acres * crop["price_per_ton"]
    cost = crop["cost_per_acre"] * area_acres
    profit = gross - cost
    return {
        "crop": crop["name"],
        "yield_per_acre": crop["yield_per_acre"],
        "price_per_ton": crop["price_per_ton"],
        "cost_per_acre": crop["cost_per_acre"],
        "profit": profit,
    }


def suitability_score(crop, soil_type, season, rainfall, temperature):
    score = 0
    soil_type = (soil_type or "").strip().lower()
    season = (season or "").strip().lower()
    # soil match
    if soil_type in [s.lower() for s in crop["soil_types"]]:
        score += 40
    # season match
    if season in [s.lower() for s in crop["seasons"]]:
        score += 30
    # rainfall closeness
    if crop["rainfall_min"] <= rainfall <= crop["rainfall_max"]:
        score += 20
    else:
        # penalize if outside range
        score -= 10
    # temperature closeness
    if crop["temp_min"] <= temperature <= crop["temp_max"]:
        score += 20
    else:
        score -= 10
    return score


# ----- Page routes -----


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/login", methods=["GET", "POST"])
def login_page():
    error = None
    if request.method == "POST":
        username = (request.form.get("username") or "").strip()
        password = (request.form.get("password") or "").strip()
        mode = (request.form.get("mode") or "login").strip()
        if username and password:
            if mode == "register":
                # Register new user (or overwrite for demo)
                USERS[username] = password
                session["user"] = username
                return redirect(url_for("dashboard_page"))
            else:
                # Login existing user
                if USERS.get(username) == password:
                    session["user"] = username
                    return redirect(url_for("dashboard_page"))
                else:
                    error = "Invalid username or password. Please register first or try again."
        else:
            error = "Please enter both username and password."
    return render_template("login.html", error=error)


@app.route("/dashboard")
def dashboard_page():
    return render_template("dashboard.html")


@app.route("/recommend")
def recommend_page():
    return render_template("recommend.html")


@app.route("/roi")
def roi_page():
    return render_template("roi.html")


@app.route("/fertilizers")
def fertilizers_page():
    return render_template("fertilizers.html")


@app.route("/sell")
def sell_page():
    return render_template("sell.html")


@app.route("/profile")
def profile_page():
    return render_template("profile.html")


@app.route("/logout")
def logout():
    session.pop("user", None)
    return redirect(url_for("login_page"))


# ----- API routes -----


@app.route("/api/recommend_crop", methods=["POST"])
def api_recommend_crop():
    data = request.get_json(force=True) or {}
    soil_type = data.get("soil_type", "")
    season = data.get("season", "")
    rainfall = float(data.get("rainfall", 0) or 0)
    temperature = float(data.get("temperature", 0) or 0)
    # Prefer session user when available
    user = session.get("user") or data.get("user")

    scored = []
    for crop in CROPS:
        score = suitability_score(crop, soil_type, season, rainfall, temperature)
        if score <= 0:
            continue
        profit_info = calculate_crop_profit(crop)
        profit_info["suitability_score"] = score
        scored.append(profit_info)

    # If no suitable crops by strict rules, fall back to all crops by profit only
    if not scored:
        for crop in CROPS:
            profit_info = calculate_crop_profit(crop)
            profit_info["suitability_score"] = 10  # minimal
            scored.append(profit_info)

    # Sort by profit descending
    ranked = sorted(scored, key=lambda c: c["profit"], reverse=True)

    best = ranked[0] if ranked else None
    response = {
        "best_crop": best,
        "other_crops": ranked[1:],
        "all_crops": ranked,
    }

    record_recommendation(user, data, response)
    return jsonify(response)


@app.route("/api/calculate_roi", methods=["POST"])
def api_calculate_roi():
    data = request.get_json(force=True) or {}
    crop_name = (data.get("crop") or "").strip().lower()
    area = float(data.get("area", 1) or 1)
    user_cost = float(data.get("cost", 0) or 0)

    crop = next((c for c in CROPS if c["name"].lower() == crop_name), None)
    if not crop:
        return jsonify({"error": "Crop not found in knowledge base"}), 400

    gross = crop["yield_per_acre"] * area * crop["price_per_ton"]
    # If user provided a custom total cost, honor that, otherwise scale dataset cost
    cost = user_cost if user_cost > 0 else crop["cost_per_acre"] * area
    profit = gross - cost

    return jsonify(
        {
            "crop": crop["name"],
            "area": area,
            "yield_per_acre": crop["yield_per_acre"],
            "price_per_ton": crop["price_per_ton"],
            "base_cost_per_acre": crop["cost_per_acre"],
            "total_cost_used": cost,
            "profit": profit,
        }
    )


@app.route("/api/fertilizers", methods=["GET"])
def api_fertilizers():
    return jsonify(FERTILIZERS)


@app.route("/api/list_crop", methods=["POST"])
def api_list_crop():
    data = request.get_json(force=True) or {}
    # Prefer session user when available
    user = (session.get("user") or data.get("user") or "guest").strip()
    crop_name = data.get("crop_name")
    quantity = data.get("quantity")
    price = data.get("price")

    listing = {
        "user": user,
        "crop_name": crop_name,
        "quantity": quantity,
        "price": price,
    }
    listings.append(listing)
    record_listing(user, listing)
    return jsonify({"status": "ok", "listings": listings})


@app.route("/api/profile", methods=["GET"])
def api_profile():
    # Prefer session user when available
    user = (session.get("user") or request.args.get("user") or "guest").strip()
    history = user_history.get(user, {"recommendations": [], "listings": []})

    profile = {
        "user": user,
        "name": f"Farmer {user.capitalize()}",
        "village": "Demo Village",
        "district": "Demo District",
        "state": "Demo State",
        "recommendations": history["recommendations"],
        "listings": history["listings"],
    }
    return jsonify(profile)


# ----- PWA files -----


@app.route("/manifest.json")
def manifest():
    return send_from_directory(app.static_folder, "manifest.json")


@app.route("/service-worker.js")
def service_worker():
    # service worker must be served from the root
    return send_from_directory(app.static_folder, "service-worker.js")


if __name__ == "__main__":
    app.run(debug=True)

