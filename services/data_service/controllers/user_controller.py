from flask import request, jsonify
from flask_restful import Resource
from models.user import User

class UserController(Resource):
    # Lấy danh sách tất cả người dùng
    def get(self):
        users = User.get_all()
        return jsonify(users)
    
    # Tạo người dùng mới
    def post(self):
        data = request.get_json()
        user = User.create(data)
        return jsonify(user)
    
    # Cập nhật thông tin người dùng
    def put(self, user_id):
        data = request.get_json()
        user = User.update(user_id, data)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        return jsonify(user)
    
    # Xóa người dùng
    def delete(self, user_id):
        success = User.delete(user_id)
        if not success:
            return jsonify({'error': 'User not found'}), 404
        return jsonify({'message': 'User deleted successfully'})
