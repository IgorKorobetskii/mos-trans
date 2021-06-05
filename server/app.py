from flask import Flask, jsonify
from flask.helpers import send_from_directory
from flask_restful import Resource, Api, reqparse
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__, static_url_path='', static_folder='../build/')
api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {'id': self.id, 'username': self.username}


@app.route('/')
def index():
    return send_from_directory('../build/', 'index.html')


class Register(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username')
        parser.add_argument('password')
        args = parser.parse_args()
        print(args)
        new_user = User(username=args['username'],
                        password=args['password'])
        db.session.add(new_user)
        db.session.commit()
        return {'message': new_user.serialize()}, 200


class Login(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username')
        parser.add_argument('password')
        args = parser.parse_args()
        print(args)

        user = User.query.filter_by(username=args.username).first()
        if (user == None):
            return {'message': 'User not found'}, 404

        if (user.password == args.password):
            return {'message': 'Successfully logged in as '+str(user.id)}, 200
        return {'message': 'Invalid username or password'}, 401


class UserList(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('Authorization', location='headers')
        args = parser.parse_args()
        print(args)
        if args.Authorization == None:
            return {'message': 'Not authorized'}, 401

        [username, password] = args.Authorization.split(' ')[1].split(',')

        user = User.query.filter_by(username=username,password=password).first()
        if (user != None):
            users = User.query.all()
            return {'users': [u.serialize() for u in users]}, 200

        return {'message': 'Not authorized'}, 401


api.add_resource(Register, '/api/register')
api.add_resource(Login, '/api/login')
api.add_resource(UserList, '/api/user')

db.drop_all()
db.create_all()
