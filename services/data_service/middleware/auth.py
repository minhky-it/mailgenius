from flask import request, jsonify, g
from kafka_client.producer import producer
from support.tool import generateRequestId
import json
from kafka_client.consumer import listenAuthTopic
import threading

def auth_required(f):
    try:
        def decorated_function(*args, **kwargs):
        # Lấy token từ header Authorization
            auth_header = request.headers.get('Authorization')

            if not auth_header:
                return jsonify({
                    "error": "Token is missing",
                    "message": "Please provide jwt token"
                }), 401

            # Tạo một requestId ngẫu nhiên để gửi đi
            request_id = generateRequestId()

            # Gửi token và requestId đến Kafka
            message = {
                "token": auth_header,
                "requestId": request_id
            }
            producer.produce("auth-requests", value=json.dumps(message).encode("utf-8"))
            producer.flush()

            # Bắt đầu lắng nghe phản hồi từ Kafka (có thể sử dụng threading để không chặn quá trình Flask)
            user_info = listen_for_user_info(request_id)

            if not user_info:
                return jsonify({
                    "error": "Invalid token",
                    "message": "Invalid token or credentials provided for user"
                }), 428

            g.user = user_info

            # Nếu token hợp lệ, tiếp tục thực hiện request
            return f(*args, **kwargs)

        decorated_function.__name__ = f.__name__  # Giữ nguyên tên của hàm gốc
        return decorated_function
    except Exception as e:
        return jsonify({
            "error": "Error authenticating",
            "message": str(e),
        }), 500

def listen_for_user_info(request_id):
    try:
        user_info = None
        consumer = listenAuthTopic(request_id)
        
        if consumer:
            user_info = consumer.get("user") 
        
        return user_info
    except Exception as e:
        return jsonify({
            "error": "Error getting user",
            "message": str(e),
        }), 501
