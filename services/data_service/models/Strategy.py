import os
from werkzeug.utils import secure_filename
from database.db import db

class Strategy(db.Model):
    __tablename__ = 'strategy'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.String(55), nullable=False)
    campaign_id = db.Column(db.String(55), nullable=False)
    transaction_path = db.Column(db.String(250), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'campaign_id': self.campaign_id,
            'transaction_path': self.transaction_path
        }

    @staticmethod
    def allowed_file(filename):
        """Check if the file has an allowed extension (CSV)."""
        return '.' in filename and filename.rsplit('.', 1)[1].lower() == 'csv'

    def upload(self, transaction_file, base_path="/app/uploads"):
        """Upload and save CSV files to specified paths."""
        # Ensure base_path exists
        os.makedirs(base_path, exist_ok=True)

        # Handle transaction file
        if transaction_file and self.allowed_file(transaction_file.filename):
            transaction_filename = secure_filename(transaction_file.filename)
            transaction_path = os.path.join(base_path, transaction_filename)
            transaction_file.save(transaction_path)
            self.transaction_path = transaction_path
        else:
            raise ValueError("Invalid or missing transaction file.")

        # Save paths to the database
        db.session.add(self)
        db.session.commit()