from flask_sqlalchemy import SQLAlchemy
from flask import Flask 
# Tạo đối tượng SQLAlchemy
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Cấu hình kết nối cơ sở dữ liệu (thay đổi URL cơ sở dữ liệu của bạn)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@postgres_data_service/data_db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Tắt theo dõi sự thay đổi của các đối tượng

    # Khởi tạo db với Flask app
    # Tạo bảng (nếu chưa có)
    db.init_app(app)

    with app.app_context():
        db.create_all()

    return app
