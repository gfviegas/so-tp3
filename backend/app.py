from flask import Flask, Blueprint
from flask_restful import Resource, Api

from model.Block import Block
from model.Disk import Disk
from model.SuperBlock import SuperBlock

app = Flask(__name__)
bp = Blueprint('api', __name__)
api = Api(bp)

class HelloWorld(Resource):
    def get(self):
        return {'Viegas': Block.teste()}, 200


api.add_resource(HelloWorld, '/')
app.register_blueprint(bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
