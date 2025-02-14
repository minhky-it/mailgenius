import os
import glob
from flask import request, jsonify, Blueprint, g
from database.db import db
from models.Strategy import Strategy
from middleware.auth import auth_required

upload_bp = Blueprint('upload_bp', __name__)
@upload_bp.route("/upload", methods=['POST'])
@auth_required
def upload():
    database = db.session
    user_id = g.user['id']
    campaign_id = request.form.get('campaign_id')
    transaction_file = request.files.get('transaction_file')

    existed_strategy = Strategy.query.filter(
        Strategy.user_id == user_id,
        Strategy.campaign_id == campaign_id
    ).first()
    if existed_strategy:
        transaction_file.save(existed_strategy.transaction_path)
        return jsonify(
            {
                "code": 200,
                "message": "Updated the transaction file successfully",
                "data": {
                    "strategy_id": existed_strategy.id,
                    "user_id": existed_strategy.user_id,
                    "campaign_id": existed_strategy.campaign_id,
                    "transaction_path": existed_strategy.transaction_path,
                }
            }
        ), 200
    
    if not user_id or not transaction_file:
        return jsonify({"error": "Transaction file must be uploaded."}), 400

    user_dir = f"/app/uploads/{user_id}"

    def clear_directory(directory):
        files = glob.glob(f"{directory}/*.csv")
        for f in files:
            os.remove(f)

    clear_directory(user_dir)

    os.makedirs(user_dir, exist_ok=True)

    new_strategy = Strategy(
        user_id=user_id,
        campaign_id=campaign_id,
        transaction_path=f"{user_dir}/{user_id}_transaction.csv"
    )

    database.add(new_strategy)
    database.commit()
    transaction_file.save(new_strategy.transaction_path)

    return {"code": 201, "message": "The transaction file is uploaded and the strategy is created successfully", "data": {
        "strategy_id": new_strategy.id,
        "user_id": new_strategy.user_id,
        "campaign_id": new_strategy.campaign_id,
        "transaction_path": new_strategy.transaction_path,
    }}, 201