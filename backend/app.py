from flask import Flask, Blueprint
from flask_restful import Resource, Api

app = Flask(__name__)
bp = Blueprint('api', __name__)
api = Api(bp)

class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}, 200


api.add_resource(HelloWorld, '/')
app.register_blueprint(bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
