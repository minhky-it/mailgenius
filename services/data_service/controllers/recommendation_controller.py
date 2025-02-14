from flask import Blueprint, request, jsonify, g
from models.Recommendation import Recommendation
from middleware.auth import auth_required

recommendation_bp = Blueprint('recommendation_bp', __name__)
@recommendation_bp.route('/get', methods=['GET'])
@auth_required
def get_recommendations():
    user_id = g.user['id']
    campaign_id = request.args.get('campaign_id')
    recommendation = Recommendation.query.filter_by(user_id=user_id, campaign_id=campaign_id).first()
    if recommendation:
        return jsonify({'message': 'Recommendations fetched successfully', 'data': recommendation.to_dict()}), 200
    return jsonify({'message': 'No recommendations found for the given campaign_id', 'data': ""}), 404