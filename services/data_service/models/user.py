from database.db import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.String(250), primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

    @staticmethod
    def get_all():
        users = User.query.all()
        return [{'id': user.id, 'name': user.name, 'email': user.email} for user in users]

    @staticmethod
    def create(data):
        new_user = User(name=data['name'], email=data['email'], password=data['password'])
        db.session.add(new_user)
        db.session.commit()
        return {'id': new_user.id, 'name': new_user.name, 'email': new_user.email}

    @staticmethod
    def update(user_id, data):
        user = User.query.get(user_id)
        if user:
            user.name = data.get('name', user.name)
            user.email = data.get('email', user.email)
            db.session.commit()
            return {'id': user.id, 'name': user.name, 'email': user.email}
        return None

    @staticmethod
    def delete(user_id):
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return True
        return False
