import threading
import logging
from flask import Flask
from database.db import db, create_app
from controllers.upload_controller import upload_bp
from controllers.als_controller import analyze_bp
from controllers.recommendation_controller import recommendation_bp
from flask_restful import Api
from database.create_db import create_db
from kafka_client.consumer import listenAuthTopic
from controllers.generateController import generate_bp
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

app = create_app()
create_db()

with app.app_context():
    db.create_all()

#  routes
app.register_blueprint(recommendation_bp, url_prefix='/recommendation')
app.register_blueprint(analyze_bp, url_prefix='/alsmodel')
app.register_blueprint(upload_bp, url_prefix='/campaign')
app.register_blueprint(generate_bp, url_prefix='/gemini')

@app.route('/')
def home():
    return {'message': 'Welcome to the REST API with Flask!'}

if __name__ == '__main__':
    consumer_thread = threading.Thread(target=listenAuthTopic, args=("requestId",))
    consumer_thread.daemon = True  
    consumer_thread.start()
    app.run(debug=True, host='0.0.0.0', port=5000)