from werkzeug.utils import secure_filename
from database.db import db

class Recommendation(db.Model):
    __tablename__ = 'recommendation'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.String, nullable=False)
    campaign_id = db.Column(db.String, nullable=False)
    recommendations = db.Column(db.JSON, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'campaign_id': self.campaign_id,
            'recommendations': self.recommendations,
        }