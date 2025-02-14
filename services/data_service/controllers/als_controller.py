import json
from database.db import db
from flask import request, jsonify, Blueprint, g
from models.ALSModel import ALSModel
from models.Recommendation import Recommendation
from middleware.auth import auth_required

analyze_bp = Blueprint('analyze_bp', __name__)
@analyze_bp.route("/analyze", methods=['POST'])
@auth_required
def analyze():
    data = request.get_json()
    num_recs = data['num_recs']
    user_id = data['user_id'],
    campaign_id = data['campaign_id'],
    transaction_path = data['transaction_path']

    try:
        recommendations = ALSModel.run(user_id, transaction_path, num_recs)
        if save_json_to_postgres(user_id, campaign_id, recommendations):
            response = {
                "code": 200,
                "message": f"ALS model trained successfully for user {user_id}",
                "data": recommendations
            }
            return jsonify(response), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
def save_json_to_postgres(user_id, campaign_id, recommendations):
    database = db.session
    try:
        recommendation = Recommendation.query.filter_by(user_id=user_id, campaign_id=campaign_id).first()
        if recommendation:
            recommendation.recommendations = json.loads(recommendations)
        else:
            new_recommendation = Recommendation(
                user_id=user_id,
                campaign_id=campaign_id,
                recommendations=json.loads(recommendations)
            )
            database.add(new_recommendation)
        
        database.commit()
        return True
    except Exception as e:
        database.rollback()
        print(f"Error: {e}")
        return False