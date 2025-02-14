import logging
from waitress import serve
from app import app

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

if __name__ == "__main__":
    serve(app, host='0.0.0.0', port=3004)
